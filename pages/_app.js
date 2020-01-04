import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import { theme } from '../lib/theme';

import Notifier from '../components/Notifier';
import Header from '../components/Header';

//adds nProgress to the next router
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

/* 
Next.js App higher order component
Extends theme from MUI them provider and baseline to all pages and components
Initialized with getInitialProps({Component, ctx})
Ensures that styles are rendered by the server on initial load and client after that

*/

class MyApp extends App {
  /*
  Passes props from a page to the App HOC, 
  Header will recieve the props too because of <Header { ...pageProps} />
  
  if a component call get initalProps, retrieve those props for the HOC and
  assign them to pageProps
  return the deconstructed pageProps object 
  */
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {};

    if (Component.getInitialProps) {
      Object.assign(pageProps, await Component.getInitialProps(ctx));
    }

    return { pageProps };
  }

  // Remove the server-side injected CSS.

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {pageProps.noHeader ? null : <Header {...pageProps} />}
          <Component {...pageProps} />
          <Notifier />
        </ThemeProvider>
      </div>
    );
  }
}

export default MyApp;
