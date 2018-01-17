// NOTE: This is the entry point for the client render
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import App from 'components/App/App';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider } from 'material-ui/styles';
import createTheme from 'helpers/createTheme';
import createStore from 'redux-modules/createStore';
import { Provider as ReduxStoreProvider } from 'react-redux';


const theme = createTheme();
const store = createStore({});
window.store = store;

function render( App ) { // eslint-disable-line no-shadow
  const root = document.getElementById('root');
  ReactDOM.hydrate(
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <ReduxStoreProvider store={store} >
          <App path={window.location.pathname} />
        </ReduxStoreProvider>
      </MuiThemeProvider>
    </AppContainer>,
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
