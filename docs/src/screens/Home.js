import React, { Component } from 'react';
import Header from '../components/Header';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom'
import format from '../utils/strings/strings';
import './styles.css'
import socketIOClient from "socket.io-client";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class Home extends Component {
    constructor(){
        super();
        this.addPlayer = this.addPlayer.bind(this);
        this.state = { pathname: "", name: '', owner: true, role: '', players: [], game: ''};
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

    updatePathname = (path) => {
        this.state.pathname = path;
    }

    render() {
        const { classes } = this.props;
        return (
            <Header title="Mafia Party">
                <div className="home screen">
                    <div className="button-container">
                        <Button variant="contained" component={Link} to={this.state} className={classes.button} 
                        onClick={() => this.updatePathname("/JoinRoom")}>
                            {format("home.joinRoom.txt")}
                        </Button>
                        <Button variant="contained" component={Link} to={this.state} className={classes.button}
                        onClick={() => this.updatePathname("/CreateRoom")}>
                            {format("home.createRoom.txt")}
                        </Button>
                    </div>
                </div>
            </Header>
        );
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
