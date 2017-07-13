import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebase from 'firebase';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAnCGeVppPtfuxHSVriiCJzrS6vipC6axg",
      authDomain: "lift-25cec.firebaseapp.com",
      databaseURL: "https://lift-25cec.firebaseio.com",
      projectId: "lift-25cec",
      storageBucket: "lift-25cec.appspot.com",
      messagingSenderId: "206432222409"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App;
