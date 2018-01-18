import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from 'redux/rootReducer';
import rootSaga from 'redux/rootSaga';
import { connectRoutes } from 'redux-first-router';
import createRoutesMap from 'routesMap';


function createReduxLogger() {
  let logger = null;
  if ( __SERVER__ ) {
    const createLogger = require('redux-cli-logger').default;
    logger = createLogger({
      downArrow: '▼',
      rightArrow: '▶',
      log: console.log, // eslint-disable-line no-console
      // when non-null, only prints if predicate(getState, action) is truthy
      predicate: null,
      // useful to trim parts of the state atom that are too verbose
      stateTransformer: () => [],
      // useful to censor private messages (containing password, etc.)
      actionTransformer: (action) => {
        // truncate large arrays
        if (
          Array.isArray(action.payload) &&
          action.payload.length > 0
        ) {
          return {
            ...action,
            payload: [ action.payload[0], `...${action.payload.length - 1} MORE ITEMS OMITTED` ],
          };
        }
        return action;
      },
    });
  }
  if ( __CLIENT__ ) {
    const reduxLogger = require('redux-logger');
    logger = reduxLogger.createLogger();
  }
  return logger;
}

export default (initialState = {}, request, history) => {
  const middleware = [];
  const {
    reducer: routeReducer,
    middleware: routeMiddleware,
    enhancer: routeEnhancer,
    thunk: routeThunk,
    initialDispatch: routeInitialDispatch,
  } = connectRoutes(
    history,
    createRoutesMap(request),
    { initialDispatch: __SERVER__ }, // Defer route initial dispatch until after saga is running
  );
  const sagaMiddleware = createSagaMiddleware();
  if ( process.env.NODE_ENV !== 'production' ) {
    const logger = createReduxLogger();
    middleware.push( logger );
  }
  middleware.push( sagaMiddleware );
  middleware.push( routeMiddleware );
  const appliedMiddleware = applyMiddleware(...middleware);
  const enhancers = compose( routeEnhancer, appliedMiddleware );
  const rootReducer = createRootReducer( routeReducer );
  const store = createStore(rootReducer, initialState, enhancers);
  const rootSagaTask = sagaMiddleware.run(rootSaga, { request });
  return {
    store,
    rootSagaTask,
    routeThunk,
    routeInitialDispatch,
  };
};
