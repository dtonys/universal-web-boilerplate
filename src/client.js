// NOTE: This is the entry point for the client render
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import App from 'components/App/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from 'helpers/createTheme';
import configureStore from 'redux/configureStore';
import { Provider as ReduxStoreProvider } from 'react-redux';
import makeRequest from 'helpers/request';
import createBrowserHistory from 'history/createBrowserHistory';


const theme = createTheme();
const request = makeRequest();
const history = createBrowserHistory();
const { store } = configureStore(window.__INITIAL_STATE__, request, history);

if ( process.env.NODE_ENV !== 'production' ) {
  window.request = request;
  window.store = store;
}

function render( App ) { // eslint-disable-line no-shadow
  const root = document.getElementById('root');
  ReactDOM.hydrate(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer warnings={false}>
        <ReduxStoreProvider store={store} >
          <App />
        </ReduxStoreProvider>
      </AppContainer>
    </MuiThemeProvider>,
    root,
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const App = require('./components/App/App').default; // eslint-disable-line no-shadow
    render(App);
  });
}
