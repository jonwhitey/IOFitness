import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import { onErrorResumeNext } from 'rxjs';
import withAuth from '../../lib/withAuth';
import { styleLoginButton } from '../../components/SharedStyles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    margin: 'auto',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ router }) {
  const redirectUrl = (router && router.query && router.query.redirectUrl) || '';
  const classes = useStyles();

  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <Head>
        <title>Log in to Builder Book</title>
        <meta name="description" content="Login page for basics.fitness" />
      </Head>
      <br />
      <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Log in</p>
      <p>You’ll be logged in for 14 days unless you log out manually.</p>
      <br />
      <form className={classes.form} noValidate method="POST" action="/login">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#">
              <a>Forgot password??</a>
            </Link>
          </Grid>
          <Grid item>
            <Link
              prefetch
              href={{ pathname: '/public/signup', query: { redirectUrl } }}
              as={{ pathname: '/signup', query: { redirectUrl } }}
            >
              <a style={{ margin: '0px 20px 0px auto' }}>Don&apos;t have an account? Sign up</a>
            </Link>
          </Grid>
        </Grid>
      </form>
      <br />
      <Button
        variant="contained"
        style={styleLoginButton}
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
  );
}

Login.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      redirectUrl: PropTypes.string,
    }),
  }).isRequired,
};

export default withAuth(withRouter(Login), { logoutRequired: true });
