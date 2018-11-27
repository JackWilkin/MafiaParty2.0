import React, { Component } from 'react';
import Header from '../components/Header';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StarIcon from '@material-ui/icons/Star';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import './styles.css'
import mockedState from '../utils/mock';
import format from '../utils/strings/strings';
import socketIOClient from "socket.io-client";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class WaitingRoom extends Component {
  constructor(props){
    super(props);
    this.state = props.location;
    this.pathname = "/RoleAssignment";
    this.addPlayer = this.addPlayer.bind(this);
  }

  addPlayer(player) {
    this.state.players.push(
          {
          name: player,
          living: true,
          role: ''
          }
        );
    this.setState(this.state);
  }

  componentWillMount() {
    const socket = socketIOClient(format("serverURL"));
    socket.on('add player', function(player){
      this.addPlayer(player);
      console.log(player); 
      }.bind(this)
    );
  }
  
  render() {
    var playerList = [];
    let mocked = mockedState(this.props.location);
    console.log(mocked);
    // playerList.push(
    // <ListItem>
    //   <ListItemIcon>
    //     <StarIcon />
    //   </ListItemIcon>
    //   <ListItemText>{mocked.name}</ListItemText>
    // </ListItem>);

    for (var i = 0; i < mocked.players.length; i++) {
      let p = mocked.players[i];
      //Add star icon in front of player name
      playerList.push(
      <ListItem>
        {mocked.name == p.name &&  <ListItemIcon><StarIcon /></ListItemIcon>}
        <ListItemText>{p.name}</ListItemText>
      </ListItem>);
    }
    const { classes } = this.props;

    return (
      <Header title={format("waitingRoom.label")}>
        <div className="button-container">
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="game-code"
            label="Game Code"
            value={mocked.game}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <List id="list" className="player-list">
            {playerList}
          </List>

          {mocked.owner && 
            <Button variant="contained" component={Link} to="/RoleAssignment" className={classes.button}>
                {format("startGame.txt")}
            </Button>
          }
        </div>
      </Header>
    );
  }
}
WaitingRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WaitingRoom);
