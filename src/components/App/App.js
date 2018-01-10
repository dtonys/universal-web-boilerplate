import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from 'components/App/App.scss';
import HomePage from 'pages/Home/Home';
import SignupPage from 'pages/Signup/Signup';
import LoginPage from 'pages/Login/Login';


const pathToComponent = {
  '/': HomePage,
  '/signup': SignupPage,
  '/login': LoginPage,
};

class App extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  render() {
    const { path } = this.props;
    const Component = pathToComponent[path];

    return (
      <div className={`${styles.app} container grey lighten-3`} >
        App Component
        <HomePage />
      </div>
    );
  }
}
export default App;
