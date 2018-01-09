import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import App from 'components/App/App';

function render( App ) { // eslint-disable-line no-shadow
  const root = document.getElementById('root');
  ReactDOM.hydrate(
    <AppContainer>
      <App />
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
