
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// uncomment if you need these material components
import Header from '../components/Header';
import icon from './images/eyesclosed.svg';

import socketIOClient from "socket.io-client";

import { Redirect } from 'react-router-dom';

// more components under component demos here
// https://material-ui.com/

// required if you're using the material components
const styles = theme => ({
  sampleClassName: {
  },
});

// template -- replace template with the component's name
class CloseEyes extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.killPlayer = this.killPlayer.bind(this);

    if (this.state.role === 'mafia' && !this.state.voteOver) {
      this.state.pathname = "/OpenEyesMafia";
      this.mafiaWakeup();
    }
    else {
      this.state.pathname = "/OpenEyes";
      this.state.voteOver = false;
    }
  }

  mafiaWakeup() {
    setTimeout(() => {
      this.setState({Redirect: true}); 
      this.setState(this.state);
    }, 5000);
  }

  componentWillMount() {
    const socket = socketIOClient(format("serverURL"));
    socket.on('kill player', function(player){
      this.killPlayer(player); 
      }.bind(this)
    );
    socket.on('execute player', function(player){
      this.executePlayer(player); 
      }.bind(this)
    );
  }

  killPlayer(player) {
    this.setState({victim: player}); 
    var victim = this.state.players.find(p => p.name === player);
    var index = this.state.players.indexOf(victim);

    if(index > -1) {
      this.state.players.splice(index, 1);
    }

    setTimeout(() => {
      this.setState({Redirect: true}); 
      this.setState(this.state);
    }, 2000);
  }

  executePlayer(player) {
    this.setState({victim: player}); 
    var victim = this.state.players.find(p => p.name === player);
    var index = this.state.players.indexOf(victim);

    if(index > -1) {
      this.state.players.splice(index, 1);
    }
  }

  render() {
    // const { classes } = this.props;
    if (this.state.Redirect) {
      return <Redirect to={this.state} />
    }
    return (
      <Header title="Close Your Eyes">
      <img className="icon" src={icon} alt="eyes"/>
        <p>It is night, time to go to sleep</p>
      </Header>
    );
  }
}
CloseEyes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CloseEyes);