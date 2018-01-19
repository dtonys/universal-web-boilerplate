import {
  LOAD_USER_STARTED, LOAD_USER_SUCCESS, LOAD_USER_ERROR,
  LOGOUT_SUCCESS,
} from './actions';


export const STORE_KEY = 'user';
const initialState = {
  user: null,
  userLoading: false,
  userLoadError: false,
};

export function extractState( globalState ) {
  return globalState[STORE_KEY];
}

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case LOAD_USER_STARTED: {
      return {
        ...state,
        userLoading: true,
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOAD_USER_ERROR: {
      return {
        ...state,
        userLoadError: action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};
