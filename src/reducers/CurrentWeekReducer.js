import { GET_CURRENT_WEEK } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_WEEK:
      return action.payload;
    default:
      return state;
  }
}
