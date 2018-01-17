import {
  createStore,
  applyMiddleware,
} from 'redux';

const initialState = {};
const rootReducer = ( state = initialState, action ) => {
  return state;
};

export default (initialState) => {
  const store = createStore(rootReducer, initialState);
  return store;
};
