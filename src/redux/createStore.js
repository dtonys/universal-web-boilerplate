import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/rootReducer';
import rootSaga from 'redux/rootSaga';


function createReduxLogger() {
  let logger = null;
  if ( __SERVER__ ) {
    const createNodeLogger = require('redux-node-logger');
    logger = createNodeLogger({
      downArrow: '▼',
      rightArrow: '▶',
      messageColor: 'black',
      prevColor: 'grey',
      actionColor: 'bright-blue',
      nextColor: 'green',
      predicate: '',
    });
  }
  if ( __CLIENT__ ) {
    const reduxLogger = require('redux-logger');
    logger = reduxLogger.createLogger();
  }
  return logger;
}

export default (initialState = {}, request) => {
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();
  if ( process.env.NODE_ENV !== 'production' ) {
    const logger = createReduxLogger();
    middleware.push( logger );
  }
  middleware.push( sagaMiddleware );
  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
  const rootTask = sagaMiddleware.run(rootSaga, { request });
  return [ store, rootTask ];
};
