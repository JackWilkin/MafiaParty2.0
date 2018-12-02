
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


const styles = theme => ({
    sampleClassName: {
    },
  });


class Rules extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="rules">
        <Header title='How to play'>
            <p>The story of Mafia Party is that members of the mafia have infiltrated a village and you, as concerned citizens, need to root them out.</p>
            <p>Every "night" in the game, all players close their eyes and the mafia secretly deliberate and pick a villager to kill. The next morning all players open their eyes and the non mafia learn who died. Then, each “day” the people of the town hold a town hall and vote to execute someone suspected of being a member of the mafia. The player with the most votes will be executed and eliminated from the game. </p>
            <p>The mafia wins when only two villagers remain in the game. The villagers win if they successfully identify the mafia and execute them. The game continues from “morning” to “town hall” to “night” on repeat until the game ends.</p>
            <p>When there are more than 8 players, there can also be an undercover cop and/or doctor playing who can help the villagers.</p>
            <div className="centered-content">
                <Button className="ready-button"variant="contained" component={Link} to='/Home'>
                    Back
                </Button>
            </div>
        </Header>
      </div>
    );
  }
}
Rules.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rules);