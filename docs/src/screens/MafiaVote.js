
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// uncomment if you need these material components
import Button  from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import VoteRadioGroup from '../components/VoteRadioGroup';
import mockedState from '../utils/mock';
import socketIOClient from "socket.io-client";

import icon from './images/gun.svg';

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
class MafiaVote extends Component {
  constructor(props) {
      super(props);
      this.state = props.location;
      this.state.pathname = "/CloseEyes";
      this.state.voteOver = true;
      this.state.Redirect = false;
      this.handleChange = value => event => {
        this.setState({
          [value]: event.target.value,
        });
        params.name = event.target.value;
      };
  }

  killPlayer = () => {
    const socket = socketIOClient(format("serverURL"));
    socket.emit('kill player', this.state.victim); 
  }

  setVictim = (player) => {
    this.setState({victim: player});
  }

  render() {
    // const { classes } = this.props;
    let victims = mockedState(this.props.location).players.slice();
    var victim = victims.find(p => p.name === this.state.name);
    var index = victims.indexOf(victim);

    if(index > -1) {
      victims.splice(index, 1);
    }
    
    return (
      <div className="mafia-vote">
        <Header title={format('mafiaVote.title.label')}>
          {/* <img className="icon" src={icon} alt="gun"/> */}
            
            <VoteRadioGroup user={this.state.name} players={victims} setVictim={this.setVictim.bind(this)}/>
            <div className="centered-content">
              <Button variant="contained" component={Link} to={this.state} className="confirm-button" 
              onClick={() => this.killPlayer()}>Confirm</Button>
            </div>
        </Header>
      </div>
    );
  }
}
MafiaVote.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MafiaVote);