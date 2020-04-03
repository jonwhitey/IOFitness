import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import Container from '@material-ui/core/Container';

import { CssBaseline, Input } from '@material-ui/core';
import { styleGoogleLoginButton, styleForm, styleTextField } from '../../SharedStyles';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    const { name } = e.target;
    const { value } = e.target;
    const { checked } = e.target;
    const { validateField } = this.props;
    console.log(`Checked name: ${name}, checked: ${checked}`);
    validateField(name, value, checked);
  }

  handleSubmit(e) {
    const { email, password, rememberMe, validateForm, rememberMeToken } = this.props;
    const data = { email, password, rememberMe, rememberMeToken, signUpOrLogin: 'login' };

    e.preventDefault();
    validateForm(data);
  }

  render() {
    const { rememberMeEmail, redirectUrl, formErrors, rememberMe } = this.props;
    console.log(this.props);
    console.log('Login.js - render login');
    console.log(formErrors);

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div align="center" width="360px">
          <Head>
            <title id="login-title">Log in to basics.fitness</title>
            <meta name="description" content="Login page for basics.fitness" />
          </Head>
          <br />
          <h1 style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Log in</h1>
          <p>You’ll be logged in for 14 days unless you log out manually.</p>
          <br />
          <form style={styleForm} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleUserInput}
              style={styleTextField}
              error={!!formErrors.email}
              id="outlined-error-helper-text"
              helperText={formErrors.email}
              defaultValue={rememberMeEmail}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleUserInput}
              style={styleTextField}
              error={!!formErrors.password}
              id="outlined-error-helper-text"
              helperText={formErrors.password}
            />

            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox
                  name="remember"
                  color="primary"
                  value={rememberMe}
                  onChange={this.handleUserInput}
                  checked={rememberMe}
                />
              }
              label="Remember me"
            />

            <br />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Log In
            </Button>
          </form>
          <br />
          <Grid container width="360px">
            <Grid item xs={6}>
              <Link href="#">
                <a>Forgot password</a>
              </Link>
            </Grid>
            <Grid item xs>
              <Link
                href={{ pathname: '/public/signup', query: { redirectUrl } }}
                as={{ pathname: '/signup', query: { redirectUrl } }}
              >
                <a>Sign up</a>
              </Link>
            </Grid>
          </Grid>
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

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  formErrors: PropTypes.shape({ email: PropTypes.string, password: PropTypes.string }),
  validEmail: PropTypes.bool,
  validPassword: PropTypes.bool,
  validForm: PropTypes.bool,
  validateField: PropTypes.func,
  validateForm: PropTypes.func,
  redirectUrl: PropTypes.string,
  rememberMe: PropTypes.bool,
  rememberMeToken: PropTypes.string,
  rememberMeEmail: PropTypes.string,
};

export default Login;
