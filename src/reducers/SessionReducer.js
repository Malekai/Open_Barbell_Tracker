import { SESSION_UPDATE } from '../actions/types';

const INITIAL_STATE = {
	movement1: '',
	movement2: '',
	movement3: '',
	movement4: '',
	movement5: '',
	movement6: '',
	notes: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
}
