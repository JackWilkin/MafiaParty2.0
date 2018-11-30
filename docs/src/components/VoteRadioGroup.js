import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class VoteRadioGroup extends Component {

  constructor(props) {
    super(props);
    this.state ={};
    this.state.value = '';
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.setVictim(event.target.value);
  };



  render() {
    const { classes } = this.props;
    var choices = [];
    for (var i = 0; i < this.props.players.length; i++) {
      let p = this.props.players[i];
      if (p.living && p.name != this.props.user.name) {
        choices.push(<FormControlLabel value={p.name} control={<Radio />} label={p.name} />);
      }
    }
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{this.props.title}</FormLabel>
          <RadioGroup
            aria-label={this.props.title}
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {choices}
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}
VoteRadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VoteRadioGroup);