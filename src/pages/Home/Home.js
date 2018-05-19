import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { extractUserState } from 'redux/user/reducer';

import styles from 'pages/Home/Home.scss';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

@connect(
  ( globalState ) => ({
    user: extractUserState(globalState).user,
  })
)
class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: PropTypes.object,
  }
  static defaultProps = {
    user: null,
  }

  render() {
    const { user } = this.props;

    return (
      <div className={ styles.wrap } >
        <Typography variant="display2" color="primary" gutterBottom >
          ⚫ Universal web boilerplate
        </Typography>
        <Typography variant="display1" color="primary" gutterBottom >
          { user &&
            `You are logged in as ${user.email}.`
          }
          { !user &&
            <Link to="/signup" >
              Sign up to get started
            </Link>
          }
        </Typography>
        <br />
        <Link to="/redux-demo" >
          <Button variant="raised" >
            Redux Demo
          </Button>
        </Link>
      </div>
    );
  }
}

export default HomePage;
