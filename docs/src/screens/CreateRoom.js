import React, { Component } from 'react';
import Header from '../components/Header';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import format from '../utils/strings/strings';
import socketIOClient from "socket.io-client";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
const params = {
  pathname: "/WaitingRoom",
  name: '',
  owner: true,
  players: [
    'jack', 'chloe', 'sindhu', 'zack'
  ],
  game: "0000",
}
class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = props.location;
    this.state.pathname = "/WaitingRoom";

    this.addPlayer = this.addPlayer.bind(this);

    this.handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
      params.name = event.target.value;
    };
  }

  addPlayer(player) {
    if (!this.isCancelled) {
        this.state.players.push(
            {
            name: player,
            living: true,
            role: 'villager'
            }
            );
        this.setState(this.state);
    }
  }

  componentDidMount() {
      const socket = socketIOClient(format("serverURL"));
      socket.on('add player', function(player){
          this.addPlayer(player);
          console.log(player); 
          }.bind(this)
      );
  }

  componentWillUnmount() {
      this.isCancelled = true;
  }

  // sending sockets -> add new player to game emit to server
  send = () => {
    const socket = socketIOClient(format("serverURL"));
    socket.emit('add player', this.state.name) 
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Header title={format("mafiaParty.label")}>
        <div className="form-container">
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="game-code"
              label={format("gameCode.label")}
              defaultValue="0000"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label={format("name.label")}
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />
          </form>
          <Button variant="contained" component={Link} to={this.state} className={classes.button} onClick={() => this.send()}>
            {format("createRoom.create.txt")}
          </Button>
        </div>
      </Header>
    );
  }
}
CreateRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateRoom);