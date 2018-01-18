import { combineReducers } from 'redux';
import countReducer, { STORE_KEY as COUNTER_STORE_KEY } from 'redux/counter/reducer';

export default combineReducers({
  [COUNTER_STORE_KEY]: countReducer,
});
