
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

  endGame(player) {
    if (!this.isCancelled) {
        this.setState({gameOver: true});
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
        <p>bummer</p>
      </Header>

    );
  }
}
YouDied.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YouDied);