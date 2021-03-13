import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '@auth0/nextjs-auth0';import Layout from '../components/layout';
import { useFetchUser, UserProvider } from '../lib/user';
import { callLoginLocal } from '../lib/loginLocal/callLoginLocal';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function Home() {
  const classes = useStyles();
  const loading = false;
  const { user, error, isLoading } = useUser();
  console.log("auth0 user");
  console.log(user);
  const localUser = callLoginLocal(user);

  return (
    <Layout user={user}>
      <h1>Next.js and Auth0 Example</h1>

      {isLoading && <p>Loading login info...</p>}

      {error && (
        <>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      {!isLoading && !error && !user && (
        <>
          <p>
            To test the login click in <a href="/api/auth/login">Login</a>
          </p>
          <p>
            Once you have logged in you should be able to click in <i>Protected Page</i> and <i>Logout</i>
          </p>
        </>
      )}
    </Layout>
  );
}


export default Home;
