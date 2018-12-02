
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
import { Redirect } from 'react-router-dom';

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
    this.state.winner = 'nobody';
    this.hangPlayer = this.hangPlayer.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  componentWillMount() {
    const socket = socketIOClient(format("serverURL"));
    socket.on('hang player', function(player){
      this.hangPlayer(player); 
      }.bind(this)
    );
    socket.on('end game', function(winner){
      this.endGame(winner);
      }.bind(this)
    );
  }

  endGame(win) {
    this.setState({pathname: '/GameOver', gameOver: true, winner: win});
  }

  hangPlayer(player) {
    //keep track of how many people have voted so we know if everyone has voted
    this.setState({voterTurnout: this.state.voterTurnout + 1});

    //If player already has votes add 1 more. 
    if(player in this.state.tally) {
      this.state.tally[player] = this.state.tally[player] + 1;
    }
    else {
      //If player has no votes add player to tally
      this.state.tally[player] = 1;
    }

    //Check if player is now frontrunner
    if(this.state.tally[player] > this.state.frontRunner.votes) {
      this.setState({pathname: "/YouDied", frontRunner: {name: player, votes: this.state.tally[player]}});
    }

    //If no longer frontrunner path goes back to /CloseEyes
    if(this.state.frontRunner.name !== this.state.name) {
      this.setState({pathname: "/CloseEyes"});
    }

    //refresh the views
    this.setState(this.state);
  }

  election() {
    var over = this.isGameOver();
    if(!over.isOver) {
      const socket = socketIOClient(format("serverURL"));
      socket.emit('execute player', this.state.frontRunner.name);
    }
    else {
      this.setState({pathname: "/GameOver", winner: over.winner});
      const socket = socketIOClient(format("serverURL"));
      socket.emit('end game', over.winner);
    } 
  }

  isGameOver() {
    var mafia = this.state.players.find(p => p.role === 'mafia').name;
    if(this.state.frontRunner.name === mafia) {
      //this.setState({pathname: "/GameOver", winner: 'villagers'});
      return {isOver: true, winner: 'villagers'};
    }
    else if(this.state.players.length <= 4){
      //this.setState({pathname: "/GameOver", winner: 'mafia'});
      return {isOver: true, winner: 'mafia'};
    }
    return {isOver: false, winner: ''};
  }

  render() {
    const { classes } = this.props;
    if (this.state.gameOver) {
      return <Redirect to={this.state} />
    }
    return (
      <Header title="Oh no!">
        <p>The Town has decided....</p>
        {this.state.voterTurnout === this.state.players.length &&
        <p>{this.state.frontRunner.name} Has Died!!!!</p>
        }

        <VoteBreakdown votes={this.state.tally}></VoteBreakdown>
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