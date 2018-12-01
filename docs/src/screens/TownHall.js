
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// uncomment if you need these material components
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import VoteRadioGroup from '../components/VoteRadioGroup';
import mockedState from '../utils/mock';
import icon from './images/townhall.svg';

import socketIOClient from "socket.io-client";

// more components under component demos here
// https://material-ui.com/

// required if you're using the material components
const styles = theme => ({

});

// this is required, pathname should be the name of the file this one should point to
// you should also import it and add a <Route> to Main.js
const params = {
  pathname: "/TownHall",
  name: '',
  roomowner: true,
  players: [
    'jack', 'chloe', 'sindhu', 'zack'
  ],
}

// template -- replace template with the component's name
class TownHall extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.state.pathname = "/ElectionResults";
    this.state.tally = {};
    this.state.frontRunner = {name: '', votes: 0};
    this.state.voterTurnout = 0;

    this.hangPlayer = this.hangPlayer.bind(this);
    this.handleChange = value => event => {
      this.setState({
        [value]: event.target.value,
      });
      params.name = event.target.value;
    };
  }

  //sets the victim of the state based on the radio buttons
  setVictim = (player) => {
    this.setState({victim: player});
  }

  //Emits town hanging event to server
  townHanging = () => {
    const socket = socketIOClient(format("serverURL"));
    socket.emit('hang player', this.state.victim) 
  }

  //Sockets are set here
  componentWillMount() {
    const socket = socketIOClient(format("serverURL"));
    socket.on('hang player', function(player){
      this.hangPlayer(player); 
      }.bind(this)
    );
  }

  //Used to prevent component memory leak
  componentWillUnmount() {
    this.isCancelled = true;
  }

  hangPlayer(player) {
    if (!this.isCancelled) {
      //keep track of how many people have voted so we know if everyone has voted
      this.setState({voterTurnout: this.state.voterTurnout + 1});

      //If player already has votes add 1 more. 
      if(player in this.state.tally) {
        this.state.tally[player] = this.state.tally[player] + 1;
      }
      else {
        //If player has no votes add them
        this.state.tally[player] = 1;
      }

      //refresh the views
      this.setState(this.state);
    }
  }

  render() {
    // const { classes } = this.props;
    let mocked = mockedState(this.state);
    
    return (
      <div className="town-hall">
        <Header title={format('townHall.title.label')}>
          <img className="icon" src={icon} alt="town-hall"/>
          <h2 className="town-hall town-hall-title">Time To Discuss!</h2>
          <p className="town-hall town-hall-body">{format('townHall.description')}</p>
          <h2 className="town-hall town-hall-title">Town Hall Ballot</h2>
          <VoteRadioGroup user={mocked.name} players={mocked.players} setVictim={this.setVictim.bind(this)}/>
          <div className="centered-content">
            <Button variant="contained" component={Link} to={this.state} className="confirm-button"
            onClick={() => this.townHanging()}>Confirm</Button>
          </div>
        </Header>
      </div>
    );
  }
}
TownHall.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TownHall);