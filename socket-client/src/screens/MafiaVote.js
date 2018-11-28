
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// uncomment if you need these material components
import Button  from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import VoteRadioGroup from '../components/VoteRadioGroup';
import mockedState from '../utils/mock';

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
class MafiaVote extends Component {
    constructor(props) {
        super(props);
        this.state = props.location;
        this.state.pathname = "/CloseEyes";
        this.state.voteOver = true;
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
      <div className="mafia-vote">
        <Header title={format('mafiaVote.title.label')}>
            <h2 className="mafia-vote">Other Mafia</h2>
            <p className="mafia-vote other-mafia">
              David Sprauge
            </p>
            <h2 className="mafia-vote">Choose your victim:</h2>
            
            <VoteRadioGroup user={mocked.name} players={mocked.players} />
            <div className="centered-content">
            <Button variant="contained" component={Link} to={this.state} className="confirm-button">Confirm</Button>
          </div>
        </Header>
      </div>
    );
  }
}
MafiaVote.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MafiaVote);