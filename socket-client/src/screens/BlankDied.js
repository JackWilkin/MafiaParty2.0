
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

const mockedDeadPerson = 'Chloe';

// template -- replace template with the component's name
class BlankDied extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.state.pathname = "/TownHall";
  }

  render() {
    const { classes } = this.props;

    return (
      <Header title="Oh no!">
        <p>A tragedy has happened....</p>

        <p>{format("lorem")}</p>
        <p>{this.state.victim} Has Died!!!!</p>
        
        <div className="centered-content">
          <Button variant="contained" component={Link} to={this.state} className={classes.button}>
            {format("global.next.txt")}
          </Button>
        </div>
      </Header>

    );
  }
}
BlankDied.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlankDied);