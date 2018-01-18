import React from 'react';
import Link from 'redux-first-router-link';

import styles from 'components/Navbar/Navbar.scss';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const Navbar = () => {
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
          <Link to="/login">
            <Button color="contrast">Login</Button>
          </Link>
          <Link to="/signup">
            <Button color="contrast">Signup</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
