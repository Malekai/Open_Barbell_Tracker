import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProgramsReducer from './ProgramsReducer';
import WeeksReducer from './WeeksReducer';
import DaysReducer from './DaysReducer';
import UIDReducer from './UIDReducer';
import CurrentWeekReducer from './CurrentWeekReducer';
import SessionReducer from './SessionReducer';

export default combineReducers({
  auth: AuthReducer,
  programs: ProgramsReducer,
  weeks: WeeksReducer,
  days: DaysReducer,
  uid: UIDReducer,
  currentWeek: CurrentWeekReducer,
  session: SessionReducer
});
