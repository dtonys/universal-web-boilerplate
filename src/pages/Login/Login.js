import React, { Component } from 'react';
import styles from 'pages/Login/Login.scss';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ( name ) => {
    return ( event ) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  render() {
    return (
      <div className={styles.formWrap}>
        <form autoComplete="off">
          <Typography type="headline" align="center" gutterBottom >
            Login
          </Typography>
          <TextField
            className={styles.textField}
            label="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            helperText=""
            margin="normal"
          />
          <TextField
            className={styles.textField}
            label="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            helperText=""
            margin="normal"
          />
          <br /><br /><br />
          <Button raised color="primary" fullWidth >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
