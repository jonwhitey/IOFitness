import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { getWorkout } from '../../lib/api/customer';

import withAuth from '../../lib/withAuth';

// Index is a little dashboard that shows the functionality of withAuth
// withAuth passed the user object as a prop to Index

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  getWorkout = async () => {
    console.log('GET WORKOUT');
    const workout = await getWorkout();
    console.log('got workout');
    console.log(workout);
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id="delete-user-button"
          onClick={this.getWorkout}
        >
          Get workout
        </Button>
      </div>
    );
  }
}

export default withAuth(Index);
Index.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};
