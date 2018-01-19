import { combineReducers } from 'redux';
import demoReducer, { STORE_KEY as DEMO_STORE_KEY } from 'redux/demo/reducer';
import userReducer, { STORE_KEY as USER_STORE_KEY } from 'redux/user/reducer';

export default ( routeReducer ) => {
  return combineReducers({
    [DEMO_STORE_KEY]: demoReducer,
    [USER_STORE_KEY]: userReducer,
    location: routeReducer,
  });
};
