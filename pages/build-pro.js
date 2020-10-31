import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Slider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import auth0 from '../lib/auth0';
import Layout from '../components/layout';
import HorizontalLinearStepper from '../components/WorkoutStepper';
import createLoginUrl from '../lib/url-helper';
import SelectField from '../components/SelectField';
import { styleForm, styleTextField } from '../components/SharedStyles';
import BuildWorkout from '../components/BuildWorkout';

import { getAllProgressions } from '../lib/api/customer';

function getSteps(numWorkouts) {
  const steps = Array.from({ length: numWorkouts }, (_, i) => i + 1);
  return steps;
}

const workouts = [
  {
    day: 'Lower Body Strength',
    lowerBody: 'Strength',
    pull: 'Hypertrophy',
    push: 'Endurance',
    lowerBody1: 'Back Squat',
    lowerBody2: 'Deadlift',
    pull1: 'Australians',
    pull2: 'Pull Ups',
    push1: 'Pushups',
    push2: 'Overhead Press',
  },
  {
    day: 'Row Strength',
    lowerBody: 'Endurance',
    pull: 'Strength',
    push: 'Hypertrophy',
    lowerBody1: 'Goblet Squat',
    lowerBody2: 'Single Leg Deadlift',
    pull1: 'Pull Ups',
    pull2: 'Bent Over Row',
    push1: 'Dips',
    push2: 'Overhead Press',
  },
  {
    day: 'Press Strength',
    lowerBody: 'Hypertrophy',
    pull: 'Endurance',
    push: 'Strength',
    lowerBody1: 'RDL',
    lowerBody2: 'Lunge',
    pull1: 'Australians',
    pull2: 'Crossover Row',
    push1: 'Overhead Press',
    push2: 'Dips',
  },
];

function BuildProgram(props) {
  const { user } = props;
  const { localUser } = props;
  const { progressions } = props;
  const { exercises } = props;
  const classes = useStyles();
  const { form, formInput } = classes;
  const { register, handleSubmit, setValue, errors, reset, control, watch } = useForm({
    defaultValues: {
      uid: user ? user.id : '',
      programName: 'Workout',
      numWorkouts: 1,
      cycles: 8,
      workoutNum: 1,
      sets: 6,
      program: workouts,
    },
  });

  const [data, setData] = useState(null);

  const lowerbody = [
    'Back Squat',
    'Goblet Squat',
    'Deadlift',
    'Single Leg Squat',
    'Lunge',
    'RDL',
    'Single Leg Squat',
    'Single Leg Deadlift',
  ];
  const pull = ['Pull Ups', 'Crossover Row', 'Australians', 'Bent Over Row'];
  const push = ['Overhead Press', 'Dips', 'Pushups'];

  const onSubmit = (data) => console.log(data);

  const handleMultiChange = (selectedOption) => {
    setValue('reactSelect', selectedOption);
  };
  const array = [1, 2, 3];
  return (
    <Layout user={user}>
      <h1 id="add-exercise">Build Your Program</h1>
      <p>Program:</p>
      <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          style={styleTextField}
          required
          name="programName"
          label="Program Name"
          defaultValue=""
          autoFocus
          inputRef={register}
        />
        <section>
          <label>Cycles</label>
          <Controller
            name="Cycles"
            control={control}
            defaultValue={0}
            render={(props) => (
              <Slider
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={12}
                min={0}
                step={1}
                marks
              />
            )}
          />
        </section>
        <Grid container className={classes.root} spacing={2}>
          {workouts.map((workout, index) => (
            <Grid item xs={4}>
              <Paper align="center" padding="50px">
                <h1 align="center">{`Workout ${index + 1}`}</h1>
                <h2 align="center">Push Exercises</h2>
                <SelectField
                  label={`${workout.push}`}
                  defaultValue={workout.push1}
                  name={`program[${index}].push1`}
                  array={push}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />

                <SelectField
                  label={`${workout.push}`}
                  defaultValue={workout.push2}
                  name={`program[${index}].push2`}
                  array={push}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />

                <h2 align="center">Pull Exercises</h2>
                <SelectField
                  label={`${workout.pull}`}
                  defaultValue={workout.pull1}
                  name={`program[${index}].pull1`}
                  array={pull}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />

                <SelectField
                  label={`${workout.pull}`}
                  defaultValue={workout.pull2}
                  name={`program[${index}].pull2`}
                  array={pull}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />

                <h2 align="center">Lowerbody Exercises</h2>
                <SelectField
                  label={`${workout.lowerBody}`}
                  defaultValue={workout.lowerBody1}
                  name={`program[${index}].lowerBody1`}
                  array={lowerbody}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
                <SelectField
                  label={`${workout.lowerBody}`}
                  defaultValue={workout.lowerBody2}
                  name={`program[${index}].lowerBody2`}
                  array={lowerbody}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Save Workout
        </Button>
      </form>
      <DevTool control={control} />
    </Layout>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  // onsole.log(session);
  if (!session || !session.user) {
    console.log('no sesssion and no user');
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }
  try {
    const { progressions } = await getAllProgressions();
    console.log('getServerSideProps!');
    // console.log(progressions);
    return {
      props: {
        progressions,
        // localUser: localUser,
        user: session.user,
      },
    };
  } catch (e) {
    console.log(e);
    return e;
  }
}

const useStyles = makeStyles((theme) => ({
  email: {
    color: 'red',
  },
  icon: {
    textAlign: 'center',
    align: 'center',
  },
}));

BuildProgram.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
  // progressions: PropTypes.shape(

  // ),
};

BuildProgram.defaultProps = {
  user: null,
  // progressions: null,
};

export default BuildProgram;
