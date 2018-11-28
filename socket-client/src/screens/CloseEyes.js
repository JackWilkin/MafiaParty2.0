
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

// this is required, pathname should be the name of the file this one should point to
// you should also import it and add a <Route> to Main.js
const params = {
  pathname: "/OpenEyes",
  name: '',
  roomowner: true,
}

// template -- replace template with the component's name
class CloseEyes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Header title="Close Your Eyes">
      <img className="icon" src={icon} alt="mafia"/>
        <p>It is night, time to go to sleep</p>
        <div className="centered-content">
        <Button variant="contained" component={Link} to={params} className={classes.button}>
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