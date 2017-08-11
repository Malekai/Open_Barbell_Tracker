import React from 'react';
import { View, StatusBar } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ProgramList from './components/ProgramList';
import WeekList from './components/WeekList';
import DayList from './components/DayList';
import Session from './components/Session';

const RouterComponent = () => {
  return (
    <Router 
      leftButtonIconStyle={{ tintColor: 'white' }} 
      sceneStyle={{ paddingTop: 65 }} 
      navigationBarStyle={{ backgroundColor: '#007aff' }} 
      titleStyle={{ fontWeight: '500', color:"#FFF" }}
    >
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
