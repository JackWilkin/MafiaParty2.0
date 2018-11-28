
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
import './styles.css'
import mockedState from '../utils/mock';
import format from '../utils/strings/strings';
import socketIOClient from "socket.io-client";
import { Redirect } from 'react-router-dom'

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
    this.addPlayer = this.addPlayer.bind(this);
    this.recieveStartGame = this.recieveStartGame.bind(this);
  }

  sendStartGame() {
    const min = 0;
    const max = this.state.players.length -1;
    const rand = Math.floor(min + Math.random() * (max - min));

    //everyone currently is villager
    //give the game a villian
    this.state.players[rand].role = 'mafia';

    const socket = socketIOClient(format("serverURL"));
    socket.emit('start game', this.state.players)
  }

  recieveStartGame(playerList) {
    this.setState({players: playerList});
    this.setState({pathname: "/VillagerRole"});
    for (var i = 0; i < this.state.players.length; i++) {
      if(this.state.players[i].name == this.state.name && this.state.players[i].role == 'mafia') {
        this.setState({role: 'mafia'});
        this.setState({pathname: "/MafiaRole"});
      }
    }
    this.Redirect = true;
    this.setState(this.state);
  }

  componentWillMount() {
    const socket = socketIOClient(format("serverURL"));
    socket.on('add player', function(player){
      this.addPlayer(player);
      console.log(player); 
      }.bind(this)
    );

    socket.on('start game', function(playerlist){
      this.recieveStartGame(playerlist);
      }.bind(this)
    );
  }

  addPlayer(player) {
    this.state.players.push(
          {
          name: player,
          living: true,
          role: 'villager'
          }
        );
    this.setState(this.state);
  }
  
  render() {
    var playerList = [];
    let mocked = mockedState(this.props.location);

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

    if (this.Redirect) {
      return <Redirect to={this.state} />
    }
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
            <Button variant="contained" className={classes.button} onClick={() => this.sendStartGame()}>
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
