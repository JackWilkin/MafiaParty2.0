
import React, { Component } from 'react';
import Header from '../components/Header';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import format from '../utils/strings/strings';


const styles = theme => ({
  taskSelect: {
    margin: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 275,
    display: 'inline-block',
    margin: theme.spacing.unit,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});
const players = [
  'jack', 'chloe', 'sindhu', 'zack'
]

const taskTwo = {
  pathname: "/TownHall", // TODO: change later
  name: 'Player',
  roomowner: false,
  players: players
}

const taskThree = {
  pathname: "/OpenEyesMafia", // TODO: change later
  name: 'Player',
  roomowner: false,
  players: players
}

const testLink = '/SocketTest'; // Change this to the route you want to go to
class TaskSelect extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Header title={format("selectTask.label")}>
        <div className={classes.taskSelect}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {format("taskOne.txt")}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {format("taskOneDesp.txt")}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" component={Link} to='/Home' className={classes.button}>
                {format("start.txt")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {format("taskTwo.txt")}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {format("taskTwoDesp.txt")}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" component={Link} to={taskTwo} className={classes.button}>
                {format("start.txt")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {format("taskThree.txt")}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {format("taskThreeDesp.txt")}
              </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" color="primary" component={Link} to={taskThree} className={classes.button}>
            {format("start.txt")}
          </Button>
            </CardActions>
          </Card>
        </div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {format("testHere.txt")}
            </Typography>
          </CardContent>
            <Button size="small" color="primary" component={Link} to={testLink} className={classes.button}>
            {format("start.txt")}
          </Button>
        </Card>
      </Header>
    );
  }
}
TaskSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskSelect);