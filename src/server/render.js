// NOTE: This is the entry point for the server render
import lodashGet from 'lodash/get';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createTheme from 'helpers/createTheme';
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'react-jss/lib/jss';

import configureStore from 'redux/configureStore';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { END as REDUX_SAGA_END } from 'redux-saga';
import makeRequest from 'helpers/request';
import { LOAD_USER_SUCCESS } from 'redux/user/actions';

import App from 'components/App/App';


function createHtml({
  js,
  styles,
  cssHash,
  appString,
  muiCss,
  initialState,
}) {

  const dllScript = process.env.NODE_ENV !== 'production' ?
    '<script type="text/javascript" src="/static/vendor.js"></script>' :
    '';

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title> universal-web-boilerplate </title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <style id="jss-server-side">${muiCss}</style>
        ${styles}
        <script>window.__INITIAL_STATE__=${JSON.stringify(initialState)}</script>
      </head>
      <body>
        <div id="root">${appString}</div>
        ${cssHash}
        ${dllScript}
        ${js}
      </body>
    </html>
  `;
}

function renderApp( sheetsRegistry, store ) {
  const generateClassName = createGenerateClassName();
  const theme = createTheme();
  const appRoot = (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <CssBaseline />
        <ReduxStoreProvider store={store} >
          <App />
        </ReduxStoreProvider>
      </MuiThemeProvider>
    </JssProvider>
  );
  return appRoot;
}

function createServerRenderMiddleware({ clientStats }) {
  return async (req, res, next) => {
    let appString = null;
    const sheetsRegistry = new SheetsRegistry();
    const request = makeRequest(req);
    const history = createMemoryHistory({ initialEntries: [ req.originalUrl ] });
    const {
      store,
      rootSagaTask,
      routeThunk,
      routeInitialDispatch,
    } = configureStore({}, request, history);

    // load initial data - fetch user
    try {
      const userData = await request('/api/session');
      const userPayload = lodashGet(userData, 'data.currentUser', null);
      store.dispatch({ type: LOAD_USER_SUCCESS, payload: userPayload });
    }
    catch ( error ) {
      next(error);
      return;
    }

    // fire off the routing dispatches, including routeThunk
    routeInitialDispatch();

    // check for immediate, synchronous redirect
    let location = store.getState().location;
    if ( location.kind === 'redirect' ) {
      res.redirect(302, location.pathname + ( location.search ? `?${location.search}` : '' ) );
      return;
    }

    // await on route thunk
    if ( routeThunk ) {
      await routeThunk(store);
    }

    // check for redirect triggered later
    location = store.getState().location;
    if ( location.kind === 'redirect' ) {
      res.redirect(302, location.pathname + ( location.search ? `?${location.search}` : '' ) );
      return;
    }

    // End sagas and wait until done
    store.dispatch(REDUX_SAGA_END);
    await rootSagaTask.done;

    try {
      const appInstance = renderApp(sheetsRegistry, store);
      appString = ReactDOM.renderToString( appInstance );
    }
    catch ( err ) {
      console.log('ReactDOM.renderToString error'); // eslint-disable-line no-console
      console.log(err); // eslint-disable-line no-console
      next(err);
      return;
    }
    const initialState = store.getState();

    const muiCss = sheetsRegistry.toString();
    const chunkNames = flushChunkNames();
    const flushed = flushChunks(clientStats, { chunkNames });
    const { js, styles, cssHash } = flushed;

    const htmlString = createHtml({
      js,
      styles,
      cssHash,
      appString,
      muiCss,
      initialState,
    });
    res.send(htmlString);
  };
}

export default createServerRenderMiddleware;

