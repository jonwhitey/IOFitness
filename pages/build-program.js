import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Slider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';

import { mergeClasses } from '@material-ui/styles';
import auth0 from '../lib/auth0';
import Layout from '../components/layout';
import createLoginUrl from '../lib/url-helper';
import SelectField from '../components/SelectField';
import { styleForm, styleTextField } from '../components/SharedStyles';
import BuildWorkout from '../components/BuildWorkout';
import { buildProgram, getAllProgressions, loginLocal } from '../lib/api/customer';

const useStyles = makeStyles((theme) => ({
  email: {
    color: 'red',
  },
  icon: {
    textAlign: 'center',
    align: 'center',
  },
  button: {
    margin: '10px',
    width: '20%',
    marginRight: '40%',
    marginLeft: '40%',
  },
  textInput: {
    width: '40%',
    marginRight: '30%',
    marginLeft: '30%',
  },
  paper: {
    padding: '10px',
  },
}));
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
const pull = ['Pullups', 'Crossover Row', 'Australians', 'Bent Over Row'];
const push = ['Overhead Press', 'Dips', 'Pushups'];

const movement = ['push', 'pull', 'lowerbody'];

const arraySelect = (str) => {
  if (str === 'push') {
    return push;
  }
  if (str === 'pull') {
    return pull;
  }
  return lowerbody;
};

// make workouts array of objects 

const workouts = [
  {
    day: 'Lower Body Strength',
    strength: ['lowerbody', 'Back Squat', 'Deadlift'],
    hypertrophy: ['pull', 'Australians', 'Pullups'],
    endurance: ['push', 'Pushups', 'Overhead Press'],
  },
  {
    day: 'Row Strength',
    strength: ['pull', 'Pullups', 'Bent Over Row'],
    hypertrophy: ['push', 'Dips', 'Overhead Press'],
    endurance: ['lowerbody', 'Goblet Squat', 'Single Leg Deadlift'],
  },
  {
    day: 'Push Strength',
    strength: ['push', 'Overhead Press', 'Dips'],
    hypertrophy: ['lowerbody', 'RDL', 'Lunge'],
    endurance: ['pull', 'Australians', 'Crossover Row'],
  },
];

function BuildProgram(props) {
  const { user } = props;
  const { localUser } = props;
  const { progressions } = props;
  const { exercises } = props;
  const classes = useStyles(props);
  const { form, formInput } = classes;
  const { register, handleSubmit, setValue, errors, control, watch } = useForm({
    defaultValues: {
      uid: user ? user.id : '',
      programName: 'Workout',
      cycles: 8,
      program: workouts,
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    const newProgram = data;
    console.log('onSubmit localUser');
    console.log(localUser);
    const response = await buildProgram({ localUser, newProgram });
    console.log(response);
    router.push({ pathname: '/workout', as: '/workout' });
  };

  const handleMultiChange = (selectedOption) => {
    setValue('reactSelect', selectedOption);
  };
  const { program } = watch();

  return (
    <Layout user={user} loading={false}>
      <h1 id="add-exercise">Build Your Program</h1>
      <p>Program:</p>
      <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
        <section className={classes.textInput}>
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
              name="cycles"
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
        </section>
        <Grid container className={classes.root} spacing={2}>
          {workouts.map((workout, index) => (
            <Grid item xs={4} key={workout.day}>
              <Paper align="center" className={classes.paper}>
                <h1 align="center">{`Workout ${index + 1}`}</h1>
                <SelectField
                  label="Strength"
                  defaultValue={workout.strength[0]}
                  name={`program[${index}].strength[0]`}
                  array={movement}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
                <SelectField
                  label="Hypertrophy"
                  defaultValue={workout.hypertrophy[0]}
                  name={`program[${index}].hypertrophy[0]`}
                  array={movement}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
                <SelectField
                  label="Endurance"
                  defaultValue={workout.endurance[0]}
                  name={`program[${index}].endurance[0]`}
                  array={movement}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
                <h2 align="center">First Set</h2>
                <SelectField
                  label="Strength Exercise 1"
                  defaultValue={workout.strength[1]}
                  name={`program[${index}].strength[1]`}
                  array={arraySelect(program[`${index}`].strength[0])}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
                <SelectField
                  label="Strength Exercise 1"
                  defaultValue={workout.strength[1]}
                  name={`program[${index}].strength[1]`}
                  array={arraySelect(program[`${index}`].strength[0])}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />

                <SelectField
                  label="Hypertrophy Exercise 1"
                  defaultValue={workout.hypertrophy[1]}
                  name={`program[${index}].hypertrophy[1]`}
                  array={arraySelect(program[`${index}`].hypertrophy[0])}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />

                <h2 align="center">Second Set</h2>
                <SelectField
                  label="Strength Exercise 2"
                  defaultValue={workout.strength[2]}
                  name={`program[${index}].strength[2]`}
                  array={arraySelect(program[`${index}`].strength[0])}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
                <SelectField
                  label="Endurance Exercise 1"
                  defaultValue={workout.endurance[1]}
                  name={`program[${index}].endurance[1]`}
                  array={arraySelect(program[`${index}`].endurance[0])}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />

                <h2 align="center">Set 3</h2>
                <SelectField
                  label="Hypertrophy Excercise 2"
                  defaultValue={workout.hypertrophy[2]}
                  name={`program[${index}].hypertrophy[2]`}
                  array={arraySelect(program[`${index}`].hypertrophy[0])}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
                <SelectField
                  label="Endurance Exercise 2"
                  defaultValue={workout.endurance[2]}
                  name={`program[${index}].endurance[2]`}
                  array={arraySelect(program[`${index}`].endurance[0])}
                  control={control}
                  handleMultiChange={handleMultiChange}
                  errors={errors}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          className={classes.button}
          fullWidth
          variant="contained"
          color="primary"
        >
          Save Workout
        </Button>
      </form>

      <DevTool control={control} />
    </Layout>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  console.log(session);
  if (!session || !session.user) {
    console.log('no sesssion and no user');
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }
  if (!req.localUser) {
    const { user } = session;
    const { localUser } = await loginLocal({ user });
    console.log('GSSP localUser');
    console.log(localUser);
    // eslint-disable-next-line consistent-return
    return {
      props: {
        // progressions,
        localUser,
        user: session.user,
      },
    };
  }
}

BuildProgram.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
  workoutProgram: PropTypes.shape({
    uid: PropTypes.string,
    programName: PropTypes.string,
    cycles: PropTypes.number,
    sets: PropTypes.number,
    program: PropTypes.arrayOf(
      PropTypes.shape({
        strength: PropTypes.array,
        hypertrophy: PropTypes.array,
        endurance: PropTypes.array,
      }),
    ),
  }),
};

BuildProgram.defaultProps = {
  user: null,
  workoutProgram: null,
  // progressions: null,
};

export default BuildProgram;
