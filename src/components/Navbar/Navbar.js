import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { extractUserState } from 'redux/user/reducer';
import {
  LOGOUT_REQUESTED,
} from 'redux/user/actions';

import styles from 'components/Navbar/Navbar.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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
              variant="title"
              color="inherit"
              className={styles.middleContent}
            >
              <Link to="/"
                style={{
                  fontSize: '40px',
                  position: 'relative',
                  top: '5px',
                }}
              >
                ⚪
              </Link>
            </Typography>
            <Link to="/admin/users">
              <Button color="secondary">Admin</Button>
            </Link>
            <Link to="/users">
              <Button color="secondary">Users</Button>
            </Link>
            { user &&
              <div>
                <Button color="secondary" onClick={this.logout} >Logout</Button>
                <Typography
                  variant="subheading"
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
                  <Button color="secondary">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button color="secondary">Signup</Button>
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
