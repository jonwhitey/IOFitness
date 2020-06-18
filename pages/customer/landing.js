import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';

import withAuth from '../../lib/withAuth';
import Workout from '../../components/customer/Workout';

import { getWorkout } from '../../lib/api/customer';

function Landing(props) {
  const { user } = props;
  const { workout } = props;
  const { headers } = props;
  const [training, setTraining] = useState(workout.training);
  const [workoutName, setWorkoutName] = useState(workout.name);
  const [date, setDate] = useState(workout.date);

  const callGetWorkout = async () => {
    console.log('GET WORKOUT');
    const response = await getWorkout({ headers }); 
    const { workout } = response;
    console.log(workout);
    setTraining(workout.training);
    setWorkoutName(workout.name);
    setDate(workout.date);
  };

  return (
    <section>
      <p id="login-success">
        Email:&nbsp;
        {user.email}
      </p>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        id="get-workout-button"
        onClick={callGetWorkout}
      >
        Get workout
      </Button>
      <Workout
        workoutName={workoutName}
        training={training}
        date={date}
        // redirectUrl={!redirectUrl ? null : redirectUrl}
      />
    </section>
  );
}

Landing.getInitialProps = async ({ req }) => {
  console.log('GET INITAL PROPS');
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
    console.log('HEADERS!');
  }
  console.log(headers);
  const response = await getWorkout({ headers });
  const { workout } = response;
  return { workout };
  /*
  const response = await fetch('http://localhost:8000/api/v1/customer/newWorkout', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  // const { workout } = await getWorkout({ headers });
  const data = await response.json();
  const { workout } = data;
  console.log(workout);
  return { workout };
  */
};

export default withAuth(Landing);

/* import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { getWorkout } from '../../lib/api/customer';

import withAuth from '../../lib/withAuth';

// Index is a little dashboard that shows the functionality of withAuth
// withAuth passed the user object as a prop to Index

// eslint-disable-next-line react/prefer-stateless-function
class Landing extends React.Component {
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

export default withAuth(Landing);
Landing.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

Landing.defaultProps = {
  user: null,
};
*/
