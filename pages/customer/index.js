import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import withAuth from '../../lib/withAuth';

// Index is a little dashboard that shows the functionality of withAuth
// withAuth passed the user object as a prop to Index

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const { user } = this.props;
    console.log(this.props);
    return (
      <div style={{ padding: '10px 45px' }}>
        <p id="purchased-books">List of purchased books</p>
        <p>
          Email:&nbsp;
          {user.email}
        </p>
      </div>
    );
  }
}

export default withAuth(Index);
