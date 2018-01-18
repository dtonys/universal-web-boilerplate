import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from 'components/App/App.scss';
import HomePage from 'pages/Home/Home';
import SignupPage from 'pages/Signup/Signup';
import LoginPage from 'pages/Login/Login';
import AllHtmlPage from 'pages/AllHtml/AllHtml';
import ReduxDemoPage from 'pages/ReduxDemo/ReduxDemo';
import NotFoundPage from 'pages/NotFound/NotFound';
import { connect } from 'react-redux';


const pathToComponent = {
  '/': HomePage,
  '/signup': SignupPage,
  '/login': LoginPage,
  '/html': AllHtmlPage,
  '/redux-demo': ReduxDemoPage,
  '/not-found': NotFoundPage,
};
const getComponent = ( path ) => {
  let RouteComponent = pathToComponent[path];
  if ( !RouteComponent ) {
    RouteComponent = NotFoundPage;
  }
  return RouteComponent;
};

@connect(
  (state) => ({
    path: state.location.pathname,
  }),
)
class App extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  componentDidMount() {
    // Remove JSS injected for material UI
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { path } = this.props;
    const RouteComponent = getComponent(path);

    return (
      <div className={`${styles.app} container`} >
        <RouteComponent />
      </div>
    );
  }
}
export default App;
