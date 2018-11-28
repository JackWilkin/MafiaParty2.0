import React, { Component } from 'react';
import Header from '../components/Header';
import Button  from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import format from '../utils/strings/strings';
import socketIOClient from "socket.io-client";

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
  roomowner: false,
  players: [
    'jack', 'chloe', 'sindhu', 'zack'
  ],
  game: ''
}

class JoinRoom extends Component {
  constructor(props) {
      super(props);
      this.state = props.location;
      this.state.pathname = "/WaitingRoom";
      this.state.owner = false;
      this.handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        console.log(name);
        if (name === 'name') {
          params.name = event.target.value;
        }
      };
  }
  // sending sockets -> add new player to game
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
                  id="game-code"
                  label={format("gameCode.label")}
                  value={this.state.game}
                  onChange={this.handleChange('game')}
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
             {format("joinRoom.join.txt")}
          </Button>
      </div>
    </Header>
  );
}
}
JoinRoom.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JoinRoom);