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
import {
  movement,
  hypertrophyRepsArray,
  strengthRepsArray,
  enduranceRepsArray,
  repsArray,
  resistanceTypeArray,
  workouts,
  arraySelect,
  finisher,
  warmup,
} from '../server/models/DBFiles/buildWorkoutDefaults';

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
    try {
      const response = await buildProgram({ localUser, newProgram });
      console.log(response);
      router.push({ pathname: '/workout', as: '/workout' });
    } catch (e) {
      return e;
    }
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
          {workouts.map((workout, workoutIndex) => (
            <Grid item xs={4} key={workout.day}>
              
              <Paper align="center" className={classes.paper}>
              <h2 align="center">Warmup</h2>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Warmup"
                      defaultValue={workout.warmup[1].exerciseName}
                      name={`program[${workoutIndex}].warmup[1].exerciseName`}
                      array={arraySelect(warmup)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.warmup[1].resistanceType}
                      name={`program[${workoutIndex}].warmup[1].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.warmup[1].resistance}
                      name={`program[${workoutIndex}].warmup[1].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].warmup[1].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.warmup[1].numReps}
                      name={`program[${workoutIndex}].warmup[1].numReps`}
                      array={repsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="warmup"
                      defaultValue={workout.warmup[2].exerciseName}
                      name={`program[${workoutIndex}].warmup[2].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].warmup[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.warmup[2].resistanceType}
                      name={`program[${workoutIndex}].warmup[2].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.warmup[2].resistance}
                      name={`program[${workoutIndex}].warmup[2].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].warmup[2].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.warmup[2].numReps}
                      name={`program[${workoutIndex}].warmup[2].numReps`}
                      array={repsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <h1 align="center">{`Workout ${workoutIndex + 1}`}</h1>
                <Grid container className={classes.root} spacing={1}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Strength"
                      defaultValue={workout.strength[0]}
                      name={`program[${workoutIndex}].strength[0]`}
                      array={movement}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectField
                      label="Hypertrophy"
                      defaultValue={workout.hypertrophy[0]}
                      name={`program[${workoutIndex}].hypertrophy[0]`}
                      array={movement}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectField
                      label="Endurance"
                      defaultValue={workout.endurance[0]}
                      name={`program[${workoutIndex}].endurance[0]`}
                      array={movement}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <h2 align="center">First Set</h2>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Strength"
                      defaultValue={workout.strength[1].exerciseName}
                      name={`program[${workoutIndex}].strength[1].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].strength[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                      align="left"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.strength[1].resistanceType}
                      name={`program[${workoutIndex}].strength[1].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.strength[1].resistance}
                      name={`program[${workoutIndex}].strength[1].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].strength[1].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.strength[1].numReps}
                      name={`program[${workoutIndex}].strength[1].numReps`}
                      array={strengthRepsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Hypertrophy"
                      defaultValue={workout.hypertrophy[1].exerciseName}
                      name={`program[${workoutIndex}].hypertrophy[1].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].hypertrophy[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.hypertrophy[1].resistanceType}
                      name={`program[${workoutIndex}].hypertrophy[1].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.hypertrophy[1].resistance}
                      name={`program[${workoutIndex}].hypertrophy[1].resistance`}
                      array={arraySelect(
                        program[`${workoutIndex}`].hypertrophy[1].resistanceType,
                        `program[${workoutIndex}].hypertrophy[1].exerciseName`,
                      )}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.hypertrophy[1].numReps}
                      name={`program[${workoutIndex}].hypertrophy[1].numReps`}
                      array={hypertrophyRepsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>

                <h2 align="center">Second Set</h2>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Strength"
                      defaultValue={workout.strength[2].exerciseName}
                      name={`program[${workoutIndex}].strength[2].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].strength[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.strength[2].resistanceType}
                      name={`program[${workoutIndex}].strength[2].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.strength[2].resistance}
                      name={`program[${workoutIndex}].strength[2].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].strength[2].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.strength[2].numReps}
                      name={`program[${workoutIndex}].strength[2].numReps`}
                      array={strengthRepsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Endurance"
                      defaultValue={workout.endurance[1].exerciseName}
                      name={`program[${workoutIndex}].endurance[1].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].endurance[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.endurance[1].resistanceType}
                      name={`program[${workoutIndex}].endurance[1].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.endurance[1].resistance}
                      name={`program[${workoutIndex}].endurance[1].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].endurance[1].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.endurance[1].numReps}
                      name={`program[${workoutIndex}].endurance[1].numReps`}
                      array={enduranceRepsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>

                <h2 align="center">Set 3</h2>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Hypertrophy"
                      defaultValue={workout.hypertrophy[2].exerciseName}
                      name={`program[${workoutIndex}].hypertrophy[2].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].hypertrophy[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.hypertrophy[2].resistanceType}
                      name={`program[${workoutIndex}].hypertrophy[2].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.hypertrophy[2].resistance}
                      name={`program[${workoutIndex}].hypertrophy[2].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].hypertrophy[2].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.hypertrophy[2].numReps}
                      name={`program[${workoutIndex}].hypertrophy[2].numReps`}
                      array={hypertrophyRepsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Endurance"
                      defaultValue={workout.endurance[2].exerciseName}
                      name={`program[${workoutIndex}].endurance[2].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].endurance[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.endurance[2].resistanceType}
                      name={`program[${workoutIndex}].endurance[2].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.endurance[2].resistance}
                      name={`program[${workoutIndex}].endurance[2].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].endurance[2].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.endurance[2].numReps}
                      name={`program[${workoutIndex}].endurance[2].numReps`}
                      array={enduranceRepsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <h2 align="center">Finisher</h2>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Finisher"
                      defaultValue={workout.finisher[1].exerciseName}
                      name={`program[${workoutIndex}].finisher[1].exerciseName`}
                      array={arraySelect(finisher)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.finisher[1].resistanceType}
                      name={`program[${workoutIndex}].finisher[1].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.finisher[1].resistance}
                      name={`program[${workoutIndex}].finisher[1].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].finisher[1].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.finisher[1].numReps}
                      name={`program[${workoutIndex}].finisher[1].numReps`}
                      array={repsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item xs={4}>
                    <SelectField
                      label="Finisher"
                      defaultValue={workout.finisher[2].exerciseName}
                      name={`program[${workoutIndex}].finisher[2].exerciseName`}
                      array={arraySelect(program[`${workoutIndex}`].finisher[0])}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Type"
                      defaultValue={workout.finisher[2].resistanceType}
                      name={`program[${workoutIndex}].finisher[2].resistanceType`}
                      array={resistanceTypeArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectField
                      label="Resistance"
                      defaultValue={workout.finisher[2].resistance}
                      name={`program[${workoutIndex}].finisher[2].resistance`}
                      array={arraySelect(program[`${workoutIndex}`].finisher[2].resistanceType)}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <SelectField
                      label="Reps"
                      defaultValue={workout.finisher[2].numReps}
                      name={`program[${workoutIndex}].finisher[2].numReps`}
                      array={repsArray}
                      control={control}
                      handleMultiChange={handleMultiChange}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
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
