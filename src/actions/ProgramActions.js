import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  ADD_PROGRAM, 
  PROGRAM_FETCH_SUCCESS, 
  ADD_WEEK,
  WEEK_FETCH_SUCCESS,
  ADD_DAY,
  DAYS_FETCH_SUCCESS,
  GET_UID,
  SESSION_UPDATE,
  GET_CURRENT_WEEK
} from './types';

// Program Actions

export const programFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs`)
      .on('value', snapshot => {
        dispatch({ type: PROGRAM_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const addProgram = (name) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs`)
      .push({ name })
      .then(() => {
        Actions.ProgramList({ type: 'reset' });
      });
  };
}

export const deleteProgram = (uid) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}`)
      .remove()
  }
}

// Week Actions

export const weekFetch = (uid) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}/weeks`)
      .on('value', snapshot => {
        dispatch({ type: WEEK_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};


export const addWeek = (uid, week) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}/weeks/`)
      .update({ [week]: { 'name': week } })
      .then(() => {
        Actions.WeekList({ type: 'reset' });
      });
  };
}

export const deleteWeek = (uid, week) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}/weeks/${week}`)
      .remove()
  }
}

// PROGRAM UID tracker

export const getUID = (uid) => {
  return {
    type: GET_UID,
    payload: uid
  }
}

// Week Tracker

export const getCurrentWeek = (week) => {
  return {
    type: GET_CURRENT_WEEK,
    payload: week
  }
}

// Day Actions

export const dayFetch = (uid, week) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}/weeks/${week}/days/`)
      .on('value', snapshot => {
        dispatch({ type: DAYS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
}

export const addDay = (uid, week, day) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}/weeks/${week}/days`)
      .update({ [day]: { name: day, session: {
          movement1: '',
          movement2: '',
          movement3: '',
          movement4: '',
          movement5: '',
          movement6: '',
          notes: ''
        } }})
      .then(() => {
        Actions.DaysList({ type: 'reset' });
      });
  };
}

export const deleteSession = (uid, week, day) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}/weeks/${week}/days/${day}`)
      .remove()
  }
}

// Session Actions
export const sessionUpdate = ({ prop, value }) => {
  return {
    type: SESSION_UPDATE,
    payload: { prop, value }
  };  
}

export const saveSession = (movement1, movement2, movement3, movement4, movement5, movement6, notes, uid, week, day) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/programs/${uid}/weeks/${week}/days/${day}/session`)
      .set({
          movement1,
          movement2,
          movement3,
          movement4,
          movement5,
          movement6,
          notes
        });  
  };
}

