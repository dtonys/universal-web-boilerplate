import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Navbar/Navbar.scss';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
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
            <a href="/">
              Auth App
            </a>
          </Typography>
          <a href="/admin">
            <Button color="contrast">Admin</Button>
          </a>
          <a href="/users">
            <Button color="contrast">Users</Button>
          </a>
          <a href="/login">
            <Button color="contrast">Login</Button>
          </a>
          <a href="/signup">
            <Button color="contrast">Signup</Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
