import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import universal from 'react-universal-component';
import Loading from 'components/Loading/Loading';

import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_REDUX_DEMO,
  ROUTE_USERS,
  ROUTE_USER_DETAIL,
  ROUTE_USER_DETAIL_TAB,
  ROUTE_ADMIN_USERS,
} from 'redux/routesMap';


const options = {
  minDelay: 300,
  loading: Loading,
};
const HomePage = universal(import('pages/Home/Home'), options);
const LoginPage = universal(import('pages/Login/Login'), options);
const SignupPage = universal(import('pages/Signup/Signup'), options);
const NotFoundPage = universal(import('pages/NotFound/NotFound'), options);
const ReduxDemoPage = universal(import('pages/ReduxDemo/ReduxDemo'), options);
const UsersListPage = universal(import('pages/UsersList/UsersList'), options);
const UserDetailPage = universal(import('pages/UserDetail/UserDetail'), options);

const actionToPage = {
  [ROUTE_HOME]: HomePage,
  [ROUTE_LOGIN]: LoginPage,
  [ROUTE_SIGNUP]: SignupPage,
  [ROUTE_REDUX_DEMO]: ReduxDemoPage,
  [ROUTE_USERS]: UsersListPage,
  [ROUTE_USER_DETAIL]: UserDetailPage,
  [ROUTE_USER_DETAIL_TAB]: UserDetailPage,
  [ROUTE_ADMIN_USERS]: UsersListPage,
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
