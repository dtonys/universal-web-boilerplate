import React, { Component } from 'react';
import Link from 'redux-first-router-link';

import styles from 'pages/Home/Home.scss';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={ styles.wrap } >
        <Typography type="display2" color="primary" gutterBottom >
          Universal web boilerplate!
        </Typography>
        <Typography type="display1" color="primary" gutterBottom >
          <Link to="/signup" >
            Sign up to get started
          </Link>
        </Typography>
        <br />
        <Link to="/redux-demo" >
          <Button raised >
            Redux Demo
          </Button>
        </Link>
      </div>
    );
  }
}

export default HomePage;
