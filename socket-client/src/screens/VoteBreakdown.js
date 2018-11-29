
import React, { Component } from 'react';
import format from '../utils/strings/strings';
import Header from '../components/Header';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  voteBreakdown: {
  },
});

class VoteBreakdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    var list = [];

    // this currently assumes a player is { name, list of player names that voted against them}
    // but it should be easy to change this than it is to pass in something that fits that
    let players = []; 

    for (var i = 0; i < players.length; i++) {
      let votes = "";
      if (players[i].votes.length > 0) {
        votes = ": " + players[i].votes.join(', ');
      }
      list.push(
        <ListItem>
          <ListItemText>{players[i].name + votes}</ListItemText>
        </ListItem>
      )
    }
    return (
        <List className="vote-list">
          {list}
        </List>
    );
  }
}
VoteBreakdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VoteBreakdown);