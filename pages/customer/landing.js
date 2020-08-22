import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import withAuth from '../../lib/withAuth';
import Workout from '../../components/customer/Workout';

import { getWorkout } from '../../lib/api/customer';

const useStyles = makeStyles((theme) => ({
  email: {
    color: 'red',
  },
}));

function Landing(props) {
  const { user } = props;
  const { workout } = props;
  const { headers } = props;
  const [workoutState, setWorkoutState] = useState(workout);
  const classes = useStyles();

  /* const callGetWorkout = async () => {
    console.log('GET WORKOUT');
    const response = await getWorkout({ headers });
    const { workout } = response;
    console.log(workout);
  };
  */

  function completeExercise(setIndex, exerciseIndex, complete) {
    console.log('landing page handleChange');
    console.log(setIndex, exerciseIndex, complete);
    const newWorkoutState = { ...workoutState };
    console.log(newWorkoutState);
    const exerciseKey = newWorkoutState.training[setIndex].exercises[exerciseIndex];
    const flipBool = complete !== 'true';
    exerciseKey.complete = flipBool;
    setWorkoutState(newWorkoutState);
    console.log(workoutState);
    console.log(exerciseKey.complete);
  }

  return (
    <section>
      <Head>
        <title>{user.email}</title>
      </Head>
      <p id="login-success" className={classes.email}>
        Email:&nbsp;
        {user.email}
      </p>
      {!workout ? (
        <h1>Welcome!</h1>
      ) : (
        <Workout workout={workoutState} completeExercise={completeExercise} />
      )}
    </section>
  );
}

Landing.getInitialProps = async ({ req, res }) => {
  console.log('GET INITAL PROPS');
  if (req && !req.user) {
    res.redirect('/login');
    return { purchasedBooks: [] };
  }
  
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
    console.log('HEADERS!');
  }
  console.log(headers);
  const response = await getWorkout({ headers });
  const { workout } = response;
  return { workout };
};

export default withAuth(Landing);
