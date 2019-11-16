import React from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  styleGoogleLoginButton,
  styleForm,
  styleTextField,
  styleSubmitButton,
  styleTitle,
} from '../../SharedStyles';

// router sets the redirect url so a user will be redirected to their last page when loggin in
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    const { validateField } = this.props;
    validateField(name, value);
  }

  handleSubmit(e) {
    const { email, password, firstName, lastName, validateForm } = this.props;
    const data = { email, password, firstName, lastName, signUpOrLogin: 'signup' };
    e.preventDefault();
    validateForm(data);
  }

  render() {
    const { redirectUrl } = this.props;
    const { formErrors } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div align="center">
          <Head>
            <title>Cerate an Account for basics.fitness</title>
            <meta name="description" content="Login page for basics.fitness" />
          </Head>
          <br />
          <p style={styleTitle}>Sign up</p>
          <form onSubmit={this.handleSubmit} style={styleForm}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onInput={this.handleUserInput}
              style={styleTextField}
            />

            <TextField
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onInput={this.handleUserInput}
              style={styleTextField}
              justify="right"
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              onInput={this.handleUserInput}
              error={formErrors.email}
              id="outlined-error-helper-text"
              helperText={formErrors.email}
              style={styleTextField}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onInput={this.handleUserInput}
              error={formErrors.password}
              id="outlined-error-helper-text"
              helperText={formErrors.password}
              style={styleTextField}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={styleSubmitButton}
            >
              Sign Up
            </Button>
          </form>

          <br />

          <Link
            href={{ pathname: '/public/login', query: { redirectUrl } }}
            as={{ pathname: '/login', query: { redirectUrl } }}
          >
            <a> Already a user? Sign in here.</a>
          </Link>

          <br />
          <br />

          <Button
            variant="contained"
            style={styleGoogleLoginButton}
            href={`/auth/google?redirectUrl=${redirectUrl}`}
          >
            <img
              src="https://storage.googleapis.com/builderbook/G.svg"
              alt="Log in with Google"
              style={{ marginRight: '10px' }}
            />
            Log in with Google
          </Button>
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  formErrors: { email: PropTypes.string, password: PropTypes.string },
  validEmail: PropTypes.bool,
  validPassword: PropTypes.bool,
  validForm: PropTypes.bool,
  validateField: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  redirectUrl: PropTypes.string,
};

export default SignUp;
