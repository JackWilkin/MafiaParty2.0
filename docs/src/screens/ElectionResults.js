
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// uncomment if you need these material components
import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import socketIOClient from "socket.io-client";
import VoteBreakdown from './VoteBreakdown';

// more components under component demos here
// https://material-ui.com/

// required if you're using the material components
const styles = theme => ({
  sampleClassName: {
  },
});

// template -- replace template with the component's name
class ElectionResults extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.state.pathname = "/CloseEyes";
    this.state.fromElection = true;
    this.hangPlayer = this.hangPlayer.bind(this);
  }

  componentWillMount() {
    const socket = socketIOClient(format("serverURL"));
    socket.on('hang player', function(player){
      this.hangPlayer(player); 
      }.bind(this)
    );
  }

  hangPlayer(player) {
    //keep track of how many people have voted so we know if everyone has voted
    this.setState({voterTurnout: this.state.voterTurnout + 1});

    //If there is no frontrunner this is the first ballot. player becomes frontrunner. 
    if (this.state.frontRunner.name === '') {
      this.setState({frontRunner: {name: player, votes: 1}});
    }

    //If player already has votes add 1 more. 
    if(player in this.state.tally) {
      this.state.tally[player] = this.state.tally[player] + 1;

      //Check if player is now frontrunner
      if(this.state.tally[player] > this.state.frontRunner.votes) {
        this.setState({frontRunner: {name: player, votes: this.state.tally[player]}});
      }
    }
    else {
      //If player has no votes either became first frontrunner so just add player to tally
      this.state.tally[player] = 1;
    }

    //If they died dont move on
    if(this.state.frontRunner.name === this.state.name) {
      this.setState({pathname: "/YouDied"});
    }
    else {
      this.setState({pathname: "/CloseEyes"});
    }

    //refresh the views
    this.setState(this.state);
  }

  election = () => {
    if(!this.isGameOver()) {
      const socket = socketIOClient(format("serverURL"));
      socket.emit('execute player', this.state.frontRunner.name);
    }
    else {
      const socket = socketIOClient(format("serverURL"));
      socket.emit('end game', this.state.winner);
    } 
  }

  isGameOver = () => {
    var mafia = this.state.players.find(p => p.role === 'mafia').name;

    if(this.state.frontRunner.name === mafia) {
      this.setState({pathname: "/GameOver"});
      this.setState({winner: 'villagers'});
      return true;
    }
    else if(this.state.players.length <= 4){
      this.setState({pathname: "/GameOver"});
      this.setState({winner: 'mafia'});
      return true;
    }
    return false;
  }

  render() {
    const { classes } = this.props;

    return (
      <Header title="Oh no!">
        <p>The Town has decided....</p>
        {this.state.voterTurnout === this.state.players.length &&
        <p>{this.state.frontRunner.name} Has Died!!!!</p>
        }

        <VoteBreakdown></VoteBreakdown>
        {this.state.voterTurnout === this.state.players.length &&
          <div className="centered-content">
            <Button variant="contained" component={Link} to={this.state} className={classes.button}
            onClick={() => this.election()}>
              {format("global.next.txt")}
            </Button>
          </div>
        }
      </Header>

    );
  }
}
ElectionResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ElectionResults);