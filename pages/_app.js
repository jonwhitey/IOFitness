import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import Head from 'next/head';
import PropTypes from 'prop-types';
import theme from '../lib/theme';

import Notifier from '../components/Notifier';

// adds nProgress to the next router
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

/* 
Next.js App higher order component
Extends theme from MUI them provider and baseline to all pages and components
Initialized with getInitialProps({Component, ctx})
Ensures that styles are rendered by the server on initial load and client after that

*/

import { UserProvider } from '@auth0/nextjs-auth0';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <UserProvider>
      <Head />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <Notifier />
      </ThemeProvider>
      </UserProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
