import lodashDifference from 'lodash/difference';
import lodashGet from 'lodash/get';
import querySerializer from 'query-string';
import { redirect, NOT_FOUND } from 'redux-first-router';

export const ROUTE_HOME = 'ROUTE_HOME';
export const ROUTE_LOGIN = 'ROUTE_LOGIN';
export const ROUTE_SIGNUP = 'ROUTE_SIGNUP';
export const ROUTE_REDUX_DEMO = 'ROUTE_REDUX_DEMO';
export const ROUTE_USERS = 'ROUTE_USERS';
export const ROUTE_USER_DETAIL = 'ROUTE_USER_DETAIL';
export const ROUTE_USER_DETAIL_TAB = 'ROUTE_USER_DETAIL_TAB';
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
  },
  [ROUTE_LOGIN]: {
    path: '/login',
    loggedOutOnly: true,
  },
  [ROUTE_SIGNUP]: {
    path: '/signup',
    loggedOutOnly: true,
  },
  [ROUTE_REDUX_DEMO]: {
    path: '/redux-demo',
  },
  [ROUTE_USERS]: {
    path: '/users',
    loggedInOnly: true,
    thunk: async (dispatch) => {
      dispatch({ type: LOAD_USERS_REQUESTED });
    },
  },
  [ROUTE_USER_DETAIL]: {
    path: '/users/:id',
    loggedInOnly: true,
    thunk: async (dispatch, getState) => {
      if ( !getState().user.users.users ) {
        dispatch({ type: LOAD_USERS_REQUESTED });
      }
    },
  },
  [ROUTE_USER_DETAIL_TAB]: {
    path: '/users/:id/:tab',
    loggedInOnly: true,
    thunk: async (dispatch, getState) => {
      if ( !getState().user.users.users ) {
        dispatch({ type: LOAD_USERS_REQUESTED });
      }
    },
  },
  [ROUTE_ADMIN_USERS]: {
    path: '/admin/users',
    requireRoles: [ 'admin' ],
    thunk: async (dispatch) => {
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

    if ( requiresLogin && !user ) {
      const nextAction = JSON.stringify({
        type: action.type,
        payload: action.payload,
        query: action.meta.location.current.query,
      });
      dispatch( redirect({
        type: ROUTE_LOGIN,
        payload: {
          query: { next: nextAction },
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
