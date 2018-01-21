import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import styles from 'pages/Signup/Signup.scss';
import TextInput from 'components/TextInput/TextInput';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import {
  required as isRequired,
  email as isEmail,
  minLength as isMinLength,
  composeValidators,
} from 'helpers/validators';
import {
  SIGNUP_REQUESTED,
} from 'redux/user/actions';
import {
  extractSignupState,
} from 'redux/user/reducer';


@connect(
  ( globalState ) => ({
    signup: extractSignupState(globalState),
  }),
)
class SignupPage extends Component {
  static propTypes = {
    signup: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  submitForm = ( values ) => {
    this.props.dispatch({ type: SIGNUP_REQUESTED, payload: values });
  }

  render() {
    const {
      signup: { error, loading },
    } = this.props;

    return (
      <div className={styles.formWrap}>
        <Form
          onSubmit={ this.submitForm }
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Typography type="headline" align="center" gutterBottom >
                Sign up
              </Typography>
              { error &&
                <div>
                  <br />
                  <Typography color="error" type="subheading" align="center" gutterBottom >
                    {error}
                  </Typography>
                </div>
              }
              <Field
                name="email"
                validate={composeValidators(isRequired, isEmail)}
                component={TextInput}
                className={styles.textField}
                label="email"
                type="text"
                margin="normal"
              />
              <Field
                name="password"
                validate={composeValidators(isRequired, isMinLength(3))}
                component={TextInput}
                className={styles.textField}
                label="password"
                type="password"
                margin="normal"
              />
              <br /><br /><br />
              <Button
                raised
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
              >
                { loading ? 'Submitting...' : 'Submit' }
              </Button>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default SignupPage;
