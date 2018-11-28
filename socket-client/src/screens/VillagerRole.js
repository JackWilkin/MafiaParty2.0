
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
import './styles.css';
import icon from './images/villager.svg';

// more components under component demos here
// https://material-ui.com/

// required if you're using the material components
const styles = theme => ({
    sampleClassName: {
    },
  });

//template -- replace template with the component's name
class VillagerRole extends Component {
    constructor(props) {
        super(props);
        this.state = props.location;
        this.state.role = 'villager';
        this.state.pathname = "/InitiateGame";
    }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="role-assignment">
      <Header title={format('roleAssignment.title.label')}>
      <h3 className="role-assignment-title">An innocent villager</h3>
      <img className="icon" src={icon} alt="villager"/>
      <p>{format('villagerRole.description')}</p>
      <div className="centered-content">
        <Button variant="contained" component={Link} to={this.state} className={classes.button}>
          {format("global.next.txt")}
        </Button>
        </div>
       </Header>
      </div>
    );
  }
}
VillagerRole.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VillagerRole);