import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { extractState as extractUserState } from 'redux/user/reducer';
import {
  LOGOUT_REQUESTED,
} from 'redux/user/actions';

import styles from 'components/Navbar/Navbar.scss';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


@connect(
  ( globalState ) => ({
    user: extractUserState(globalState).user,
  })
)
class Navbar extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }
  static defaultProps = {
    user: null,
  }

  logout = () => {
    this.props.dispatch({ type: LOGOUT_REQUESTED });
  }

  render() {
    const {
      user,
    } = this.props;

    return (
      <div className="navbar-fixed" >
        <AppBar position="fixed" >
          <Toolbar className={styles.toolBar} >
            <Typography
              type="title"
              color="inherit"
              className={styles.middleContent}
            >
              <Link to="/" >
                Auth App
              </Link>
            </Typography>
            <Link to="/admin">
              <Button color="contrast">Admin</Button>
            </Link>
            <Link to="/users">
              <Button color="contrast">Users</Button>
            </Link>
            { user &&
              <div>
                <Button color="contrast" onClick={this.logout} >Logout</Button>
                <Typography
                  type="subheading"
                  color="inherit"
                  style={{ display: 'inline-flex' }}
                >
                  { user.email.substr(0, user.email.indexOf('@')) }
                </Typography>
              </div>
            }
            { !user &&
              <div>
                <Link to="/login">
                  <Button color="contrast">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button color="contrast">Signup</Button>
                </Link>
              </div>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default Navbar;
