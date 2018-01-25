import { mount } from 'enzyme';
import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import configureStore from 'redux/configureStore';
import createTheme from 'helpers/createTheme';
import makeRequest from 'helpers/request';
import { MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { Provider as ReduxStoreProvider } from 'react-redux';
import PageLayout from 'components/PageLayout/PageLayout';


export function wrapWithProviders( Component, initialState ) {
  const theme = createTheme();
  const request = makeRequest();
  const history = createMemoryHistory({ initialEntries: [ '/' ] });
  const {
    store,
    routeInitialDispatch,
  } = configureStore(initialState, request, history);
  routeInitialDispatch();

  return (
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <ReduxStoreProvider store={store} >
        { Component }
      </ReduxStoreProvider>
    </MuiThemeProvider>
  );
}

export function mountComponent( RawComponent, initialState ) { // eslint-disable-line
  return mount(wrapWithProviders(
    <RawComponent />,
    initialState,
  ));
}

export function mountPage( PageComponent, initialState ) { // eslint-disable-line
  return mount(wrapWithProviders(
    <PageLayout>
      <PageComponent />
    </PageLayout>,
    initialState,
  ));
}
