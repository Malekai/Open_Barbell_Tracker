import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ProgramList from './components/ProgramList';
import WeekList from './components/WeekList';
import DayList from './components/DayList';
import Session from './components/Session';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" />
      </Scene>

      <Scene key="main">
        <Scene key="ProgramList" component={ProgramList} title="Programs" />
        <Scene key="WeekList" component={WeekList} title="Weeks" />
        <Scene key="DayList" component={DayList} title="Sessions" />
        <Scene key="Session" component={Session} title="Training Session" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
