
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
import icon from './images/eyesclosed.svg';

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
    debugger;
    if (this.state.role === 'mafia' && !this.state.voteOver) {
      this.state.pathname = "/OpenEyesMafia"
    }
    else {
      this.state.pathname = "/OpenEyes";
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Header title="Close Your Eyes">
      <img className="icon" src={icon} alt="mafia"/>
        <p>It is night, time to go to sleep</p>
        <div className="centered-content">
        <Button variant="contained" component={Link} to={this.state} className={classes.button}>
          {format("global.next.txt")}
        </Button>
        </div>
      </Header>
    );
  }
}
CloseEyes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CloseEyes);