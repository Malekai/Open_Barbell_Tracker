import { GET_UID } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_UID:
      return action.payload;
    default:
      return state;
  }
}
