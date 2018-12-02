
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// uncomment if you need these material components
import Header from '../components/Header';
import icon from './images/moon.svg';

import socketIOClient from "socket.io-client";

import { Redirect } from 'react-router-dom';

import Sound from 'react-sound';
import soundfile from './sound/mafia-open-eyes.mp3';

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
    this.endGame = this.endGame.bind(this);

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
      const socket = socketIOClient(format("serverURL"));
      socket.emit('mafia wakeup'); 
      this.setState({Redirect: true}); 
      this.setState(this.state);
    }, 5000);
  }

  endGame(win) {
    this.setState({pathname: '/GameOver', gameOver: true, winner: win});
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
    socket.on('mafia wakeup', function(){
      this.setState({playsound: true}); 
      }.bind(this)
    );
    socket.on('end game', function(winner){
      this.endGame(winner);
      }.bind(this)
    );
  }

  killPlayer(player) {
    this.setState({victim: player});
    this.setState({playsound: false}); 
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
    if (this.state.gameOver) {
      return <Redirect to={this.state} />
    }
    if (this.state.Redirect) {
      return <Redirect to={this.state} />
    }
    return (
      <Header title="Close Your Eyes">
      <img className="icon" src={icon} alt="eyes"/>
        <p>It is now night, time to go to sleep</p>
        {this.state.playsound &&
        <Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          playFromPosition={20 /* in milliseconds */}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        }
      </Header>
    );
  }
}
CloseEyes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CloseEyes);