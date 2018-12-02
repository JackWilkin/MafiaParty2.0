
import React, { Component } from 'react';
// import format from '../utils/strings/strings';
// import Header from '../components/Header';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom'

// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  voteBreakdown: {
  },
});

class VoteBreakdown extends Component {

  render() {
    var list = [];

    let votes = this.props.votes;

    for (var player in votes) {
      if (votes.hasOwnProperty(player)) {
        list.push(
          <ListItem>
            <ListItemText>{player}: {votes[player]} vote{votes[player] > 1 ? "s" : ""}</ListItemText>
          </ListItem>
        )
      }
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