import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import './header.css';
const styles = theme => ({
  container: {
    width: "50%",
    minWidth: "300px",
    padding: "20px",
    margin: "auto",
    marginTop: "20px",
    minHeight: "500px"
  },
  body: {
    paddingTop: "40px"
  },
  header: {
    textAlign: "center"
  }
});

class Header extends Component {
  render() {
        const { classes } = this.props;
        return (
      <div className="body">
        <Paper  className={classes.container}>
        <Typography className={classes.header} color="primary" variant="h4">
          {this.props.title}
        </Typography>
        <Typography variant="body2" className={classes.body}>
          {this.props.children}
        </Typography>
      </Paper>
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
