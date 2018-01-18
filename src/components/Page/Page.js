import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import universal from 'react-universal-component';
import { CircularProgress } from 'material-ui/Progress';


import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_ALL_HTML,
  ROUTE_REDUX_DEMO,
} from 'routesMap';


const Loading = () => (
  <CircularProgress style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  }} />
);
const options = {
  minDelay: 300,
  loading: Loading,
};
const HomePage = universal(import('pages/Home/Home'), options);
const LoginPage = universal(import('pages/Login/Login'), options);
const SignupPage = universal(import('pages/Signup/Signup'), options);
const AllHtmlPage = universal(import('pages/AllHtml/AllHtml'), options);
const NotFoundPage = universal(import('pages/NotFound/NotFound'), options);
const ReduxDemoPage = universal(import('pages/ReduxDemo/ReduxDemo'), options);

const actionToPage = {
  [ROUTE_HOME]: HomePage,
  [ROUTE_LOGIN]: LoginPage,
  [ROUTE_SIGNUP]: SignupPage,
  [ROUTE_ALL_HTML]: AllHtmlPage,
  [ROUTE_REDUX_DEMO]: ReduxDemoPage,
  [NOT_FOUND]: NotFoundPage,
};
const getPageFromRoute = ( routeAction ) => {
  let RouteComponent = actionToPage[routeAction];
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
class Page extends Component {
  static propTypes = {
    routeAction: PropTypes.string.isRequired,
  }
  render() {
    const { routeAction } = this.props;
    const RoutedPage = getPageFromRoute(routeAction);

    return (
      <RoutedPage />
    );
  }

}

export default Page;
