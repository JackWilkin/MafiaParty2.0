
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// uncomment if you need these material components
import Button  from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';

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
    pathname: "/MafiaVote",
    name: '',
    roomowner: true,
  }

// template -- replace template with the component's name
class OpenEyes extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    const { classes } = this.props;
    
    return (
      <Header title="Open Your Eyes">
        <p>Time to wake up</p>
        <Button variant="contained" component={Link} to={params} className={classes.button}>
          {format("global.next.txt")}
        </Button>
      </Header>
    );
  }
}
OpenEyes.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OpenEyes);