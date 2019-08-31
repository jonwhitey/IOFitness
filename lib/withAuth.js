import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

let globalUser = null;

/* 
withAuth passes a user object to pages and redirects a user according to their login status
wraps all pages and passes user data to the pages
*/
export default (
  Page,
  { loginRequired = true, logoutRequired = false, adminRequired = false, noHeader = false } = {},
) =>
  class BaseComponent extends React.Component {
    static propTypes = {
      user: PropTypes.shape({
        id: PropTypes.string,
        isAdmin: PropTypes.bool,
      }),
      isFromServer: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      user: null,
    };

    componentDidMount() {
      const { user, isFromServer } = this.props;

      // checks if a user is server-side rendered, true if ctx.req exists
      if (isFromServer) {
        globalUser = user;
      }

      // is login requitred, logout not required, and no user object
      // send to login page
      if (loginRequired && !logoutRequired && !user) {
        Router.push('/public/login', '/login');
        return;
      }

      // if logoutRequired and user exists, send to index
      if (logoutRequired && user) {
        Router.push('/');
      }

      // if adminRequired and user does not exist or is not admin, send to /my-books
      if (adminRequired && (!user || !user.isAdmin)) {
        Router.push('/customer/my-books', '/my-books');
      }
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer, noHeader };

      if (Page.getInitialProps) {
        Object.assign(props, (await Page.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      if (adminRequired && (!user || !user.isAdmin)) {
        return null;
      }

      return <Page {...this.props} />;
    }
  };
