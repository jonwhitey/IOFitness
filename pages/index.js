import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import auth0 from '../lib/auth0';
import Layout from '../components/layout';
import { useFetchUser, UserProvider } from '../lib/user';
import { loginLocal, getMe } from '../lib/api/customer';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function Home({ user }) {
  const classes = useStyles();
  const loading = false;

  return (
    <Layout user={user} loading={false}>
      <h1>Next.js and Auth0 Example</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in
            <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in
            <i>Profile</i>
            and
            <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <img src={user.picture} alt="user" />
          <p>nickname:{user.nickname}</p>
          <p>name: {user.name}</p>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  console.log(session);
  if (!session || !session.user) {
    console.log('no sesssion and no user');
    return { props: { user: null } };
  }

  console.log(session.user);
  const { user } = session;
  try {
    console.log('loginLocal index.js');
    const { localUser } = await loginLocal({ user });

    return {
      props: {
        user: session.user,
        localUser,
      },
    };
  } catch (e) {
    return { props: { user: session.user } };
  }
}

export default Home;
