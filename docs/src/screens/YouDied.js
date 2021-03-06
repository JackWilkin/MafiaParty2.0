
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom'

// uncomment if you need these material components
// import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import socketIOClient from "socket.io-client";
import { Redirect } from 'react-router-dom';
import icon from './images/coffin.svg';

// more components under component demos here
// https://material-ui.com/

// required if you're using the material components
const styles = theme => ({
  sampleClassName: {
  },
});

// template -- replace template with the component's name
class YouDied extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.endGame = this.endGame.bind(this);
    this.state.pathname = "/GameOver";
  }

  endGame(win) {
    if (!this.isCancelled) {
        this.setState({gameOver: true, winner: win});
    }
  }

  componentDidMount() {
      const socket = socketIOClient(format("serverURL"));
      socket.on('end game', function(winner){
          this.endGame(winner);
          }.bind(this)
      );
  }

  componentWillUnmount() {
      this.isCancelled = true;
  }

  render() {
    // const { classes } = this.props;
    if (this.state.gameOver) {
      return <Redirect to={this.state} />
    }
    return (
      <Header title="You Died">
        <img className="icon" src={icon} alt="coffin"/>
      </Header>

    );
  }
}
YouDied.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YouDied);