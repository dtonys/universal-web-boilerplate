import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import universal from 'react-universal-component';

import styles from 'components/App/App.scss';

const options = {
  minDelay: 500,
};
const HomePage = universal(import('pages/Home/Home'), options);
const LoginPage = universal(import('pages/Login/Login'), options);
const SignupPage = universal(import('pages/Signup/Signup'), options);
const AllHtmlPage = universal(import('pages/AllHtml/AllHtml'), options);
const NotFoundPage = universal(import('pages/NotFound/NotFound'), options);
const ReduxDemoPage = universal(import('pages/ReduxDemo/ReduxDemo'), options);

// const HomePage = require('pages/Home/Home').default;
// const LoginPage = require('pages/Login/Login').default;
// const SignupPage = require('pages/Signup/Signup').default;
// const AllHtmlPage = require('pages/AllHtml/AllHtml').default;
// const NotFoundPage = require('pages/NotFound/NotFound').default;
// const ReduxDemoPage = require('pages/ReduxDemo/ReduxDemo').default;

import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_ALL_HTML,
  ROUTE_REDUX_DEMO,
} from 'routesMap';


const actionToComponent = {
  [ROUTE_HOME]: HomePage,
  [ROUTE_LOGIN]: LoginPage,
  [ROUTE_SIGNUP]: SignupPage,
  [ROUTE_ALL_HTML]: AllHtmlPage,
  [ROUTE_REDUX_DEMO]: ReduxDemoPage,
  [NOT_FOUND]: NotFoundPage,
};
const getComponentFromAction = ( routeAction ) => {
  let RouteComponent = actionToComponent[routeAction];
  if ( !RouteComponent ) {
    RouteComponent = NotFoundPage;
  }
  return RouteComponent;
};

@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class App extends Component {
  static propTypes = {
    routeAction: PropTypes.string.isRequired,
  }

  componentDidMount() {
    // Remove JSS injected for material UI
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { routeAction } = this.props;
    const RouteComponent = getComponentFromAction(routeAction);

    return (
      <div className={`${styles.app} container`} >
        <RouteComponent />
      </div>
    );
  }
}
export default App;
