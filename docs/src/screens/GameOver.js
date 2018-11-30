
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

// more components under component demos here
// https://material-ui.com/

// required if you're using the material components
const styles = theme => ({
  sampleClassName: {
  },
});

// template -- replace template with the component's name
class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.state.pathname = "/";
  }

  render() {
    const { classes } = this.props;

    return (
      <Header title="Game Over">
        <p>The winner is the {this.state.winner}</p>
      </Header>

    );
  }
}
GameOver.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameOver);