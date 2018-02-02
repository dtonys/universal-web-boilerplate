import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  LOAD_DATA_STARTED, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR,
} from 'redux/demo/actions';


export const STORE_KEY = 'demo';
const initialState = {
  count: 0,
  posts: [],
  postsLoading: false,
  postsError: null,
};

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case INCREMENT_COUNTER: {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case DECREMENT_COUNTER: {
      return {
        ...state,
        count: state.count - 1,
      };
    }
    case LOAD_DATA_STARTED: {
      return {
        ...state,
        postsLoading: true,
      };
    }
    case LOAD_DATA_SUCCESS: {
      return {
        ...state,
        postsLoading: false,
        posts: action.payload,
      };
    }
    case LOAD_DATA_ERROR: {
      return {
        ...state,
        postsLoading: false,
        postsError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

