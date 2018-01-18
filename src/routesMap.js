import { redirect, NOT_FOUND } from 'redux-first-router'

export const ROUTE_HOME = 'ROUTE_HOME';
export const ROUTE_LOGIN = 'ROUTE_LOGIN';
export const ROUTE_SIGNUP = 'ROUTE_SIGNUP';
export const ROUTE_REDUX_DEMO = 'ROUTE_REDUX_DEMO';
export const ROUTE_ALL_HTML = 'ROUTE_ALL_HTML';


export default ( request ) => {
  return {
    [ROUTE_HOME]: {
      path: '/',
      // thunk: async () => {}
    },
    [ROUTE_LOGIN]: {
      path: '/login',
      // thunk: async () => {}
    },
    [ROUTE_SIGNUP]: {
      path: '/signup',
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
  }
};
