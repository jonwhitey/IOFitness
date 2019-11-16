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

import { CssBaseline } from '@material-ui/core';
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
    const { validateField } = this.props;
    validateField(name, value);
  }

  handleSubmit(e) {
    const { email, password, validateForm } = this.props;
    const data = { email, password, signUpOrLogin: 'login' };
    e.preventDefault();
    validateForm(data);
  }

  render() {
    const { redirectUrl, formErrors } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div align="center" width="360px">
          <Head>
            <title>Log in to basics.fitness</title>
            <meta name="description" content="Login page for basics.fitness" />
          </Head>
          <br />
          <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Log in</p>
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
              error={formErrors.email}
              id="outlined-error-helper-text"
              helperText={formErrors.email}
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
              error={formErrors.password}
              id="outlined-error-helper-text"
              helperText={formErrors.password}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
              <Link href="#" align="left">
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
};

export default Login;
