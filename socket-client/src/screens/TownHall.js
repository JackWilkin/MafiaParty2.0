
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// uncomment if you need these material components
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import VoteRadioGroup from '../components/VoteRadioGroup';
import mockedState from '../utils/mock';
import icon from './images/townhall.svg';

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
class TownHall extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = value => event => {
      this.setState({
        [value]: event.target.value,
      });
      params.name = event.target.value;
    };
  }

  render() {
    const { classes } = this.props;
    let mocked = mockedState(this.props.location);
    
    return (
      <div className="town-hall">
        <Header title={format('townHall.title.label')}>
          <img className="icon" src={icon} alt="mafia"/>
          <h2 className="town-hall town-hall-title">Time To Discuss!</h2>
          <p className="town-hall town-hall-body">{format('townHall.description')}</p>
          <h2 className="town-hall town-hall-title">Town Hall Ballot</h2>
          <VoteRadioGroup user={mocked.name} players={mocked.players} />
          <div className="centered-content">
            <Button variant="contained" component={Link} to="/BlankDied" className="confirm-button">Confirm</Button>
          </div>
        </Header>
      </div>
    );
  }
}
TownHall.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TownHall);