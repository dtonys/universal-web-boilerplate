import lodashDifference from 'lodash/difference';
import lodashGet from 'lodash/get';
import querySerializer from 'query-string';
import { redirect, NOT_FOUND } from 'redux-first-router';

export const ROUTE_HOME = 'ROUTE_HOME';
export const ROUTE_LOGIN = 'ROUTE_LOGIN';
export const ROUTE_SIGNUP = 'ROUTE_SIGNUP';
export const ROUTE_REDUX_DEMO = 'ROUTE_REDUX_DEMO';
export const ROUTE_ALL_HTML = 'ROUTE_ALL_HTML';
export const ROUTE_USERS = 'ROUTE_USERS';
export const ROUTE_ADMIN_USERS = 'ROUTE_ADMIN_USERS';

import {
  extractUserState,
} from 'redux/user/reducer';
import {
  LOAD_USERS_REQUESTED,
} from 'redux/user/actions';


const routesMap = {
  [ROUTE_HOME]: {
    path: '/',
    // thunk: async () => {}
  },
  [ROUTE_LOGIN]: {
    path: '/login',
    loggedOutOnly: true,
    // thunk: async () => {}
  },
  [ROUTE_SIGNUP]: {
    path: '/signup',
    loggedOutOnly: true,
    // thunk: async () => {}
  },
  [ROUTE_REDUX_DEMO]: {
    path: '/redux-demo',
    // thunk: async () => {}
  },
  [ROUTE_ALL_HTML]: {
    path: '/html',
    // thunk: async () => {}
  },
  [ROUTE_USERS]: {
    path: '/users',
    loggedInOnly: true,
    thunk: async (dispatch /* , getState */) => {
      dispatch({ type: LOAD_USERS_REQUESTED });
    },
  },
  [ROUTE_ADMIN_USERS]: {
    path: '/admin/users',
    requireRoles: [ 'admin' ],
    thunk: async (dispatch /* , getState */) => {
      dispatch({ type: LOAD_USERS_REQUESTED });
    },
  },
  [NOT_FOUND]: {
    path: '/not-found',
  },
};

export const routeOptions = {
  querySerializer,
  // Defer route initial dispatch until after saga is running
  initialDispatch: !__SERVER__,
  // Check permissions and redirect if not authorized for given route
  onBeforeChange: ( dispatch, getState, { action }) => {
    const { user } = extractUserState(getState());
    const { loggedOutOnly, loggedInOnly, requireRoles } = routesMap[action.type];
    const requiresLogin = Boolean( loggedInOnly || requireRoles );

    // redirect to home page if logged in and visiting logged out only routes
    if ( loggedOutOnly && user ) {
      dispatch( redirect({ type: ROUTE_HOME }) );
      return;
    }

    // redirect to login page if not logged in
    if ( requiresLogin && !user ) {
      dispatch( redirect({
        type: ROUTE_LOGIN,
        payload: {
          query: { next: action.type },
        },
      }) );
      return;
    }

    // redirect to 404 if logged in but invalid role
    if ( requireRoles ) {
      const userRoles = lodashGet( user, 'roles' );
      const hasRequiredRoles = userRoles && lodashDifference(requireRoles, userRoles).length === 0;
      if ( !hasRequiredRoles ) {
        dispatch( redirect({ type: NOT_FOUND }) );
      }
    }
  },
};


export default routesMap;
