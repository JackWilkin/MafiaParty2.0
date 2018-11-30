
// these are required imports
import React, { Component } from 'react';
import format from '../utils/strings/strings';

// uncomment if you're including the button/textfield/etc components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// uncomment if you need these material components
import Button  from '@material-ui/core/Button';
import Header from '../components/Header';

// more components under component demos here
// https://material-ui.com/

// required if you're using the material components
const styles = theme => ({
    sampleClassName: {
    },
  });


//template -- replace template with the component's name
class InitiateGame extends Component {
    constructor(props) {
      super(props);

      this.state = props.location;
      this.state.pathname = "/CloseEyes";
    }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="initiate-game">
      <Header title={format('initiateGame.title.label')}>
      <p>{format('initiateGame.text')}</p>
      <div className="centered-content">
                <Button className="ready-button"variant="contained" component={Link} to={this.state}>{format("global.ready.txt")}</Button>
      </div>
       </Header>
      </div>
    );
  }
}
InitiateGame.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InitiateGame);