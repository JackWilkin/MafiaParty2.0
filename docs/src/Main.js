import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TaskSelect from './screens/TaskSelect'
import CreateRoom from './screens/CreateRoom'
import Home from './screens/Home'
import JoinRoom from './screens/JoinRoom'
import WaitingRoom from './screens/WaitingRoom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import TownHall from './screens/TownHall';
import RoleAssignment from './screens/RoleAssignment';
import InitiateGame from './screens/InitiateGame';
import CloseEyes from './screens/CloseEyes';
import OpenEyes from './screens/OpenEyes';
import OpenEyesMafia from './screens/OpenEyesMafia';
import BlankDied from './screens/BlankDied';
import MafiaVote from './screens/MafiaVote';
import MafiaRole from './screens/MafiaRole';
import VillagerRole from './screens/VillagerRole';
import ElectionResults from './screens/ElectionResults';
import YouDied from './screens/YouDied';
import GameOver from './screens/GameOver';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  }
});

class Main extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Task' component={TaskSelect} />
              <Route exact path='/Home' component={Home}/>
              <Route path='/CreateRoom' component={CreateRoom} />
              <Route path='/JoinRoom' component={JoinRoom} />
              <Route path="/WaitingRoom" component={WaitingRoom} />
              <Route path="/TownHall" component={TownHall} />
              <Route path="/InitiateGame" component={InitiateGame} />
              <Route path="/RoleAssignment" component={RoleAssignment} />
              <Route path="/CloseEyes" component={CloseEyes} />
              <Route path="/OpenEyes" component={OpenEyes} />
              <Route path="/OpenEyesMafia" component={OpenEyesMafia} />
              <Route path="/BlankDied" component={BlankDied} />
              <Route path="/MafiaVote" component={MafiaVote} />
              <Route path="/MafiaRole" component={MafiaRole} />
              <Route path="/VillagerRole" component={VillagerRole} />
              <Route path="/ElectionResults" component={ElectionResults} />
              <Route path="/YouDied" component={YouDied} />
              <Route path="/GameOver" component={GameOver} />
            </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;