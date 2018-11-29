
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

const mockedDeadPerson = 'Chloe';

// template -- replace template with the component's name
class ElectionResults extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.state.pathname = "/CloseEyes";
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
    this.setState({voterTurnout: this.state.voterTurnout + 1});
    if (this.state.frontRunner.name == '') {
      this.setState({frontRunner: {name: player, votes: 1}});
    }

    if(player in this.state.tally) {
      this.state.tally[player] = this.state.tally[player] + 1;

      if(this.state.tally[player] > this.state.frontRunner.votes) {
        this.setState({frontRunner: {name: player, votes: this.state.tally[player]}});
      }
    }
    else {
      this.state.tally[player] = 1;
    }
    this.setState(this.state);
  }

  election = () => {
    const socket = socketIOClient(format("serverURL"));
    socket.emit('kill player', this.state.frontRunner.name); 
  }

  render() {
    const { classes } = this.props;

    return (
      <Header title="Oh no!">
        <p>The Town has decided....</p>
        <p>{this.state.voterTurnout}</p>
        {this.state.voterTurnout == this.state.players.length &&
        <p>{this.state.frontRunner.name} Has Died!!!!</p>
        }

        <VoteBreakdown></VoteBreakdown>
        {this.state.voterTurnout == this.state.players.length &&
          <div className="centered-content">
            <Button variant="contained" component={Link} to={this.state} className={classes.button}>
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