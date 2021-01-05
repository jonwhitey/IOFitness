/* eslint-disable react/jsx-one-expression-per-line */
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Slider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';

import auth0 from '../lib/auth0';
import Layout from '../components/layout';
import SelectField from '../components/SelectField';
import { styleForm, styleTextField } from '../components/SharedStyles';
import { buildProgram, getAllProgressions, loginLocal } from '../lib/api/customer';
import {
  setsArray,
  setArray,
  timeArray,
  resistanceTypeArray,
  arraySelect,
} from '../server/models/DBFiles/buildWorkoutDefaults';
import workouts from '../server/models/DBFiles/workoutsTry';

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
    try {
      const response = await buildProgram({ localUser, newProgram });
      console.log(response);
      router.push({ pathname: '/workout', as: '/workout' });
      return response;
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
            <Grid item xs={12} key={workout.day}>
              <Paper align="center" className={classes.paper}>
                <h2 align="center">Workout {workoutIndex + 1}</h2>
                {workout.map((exercise, exerciseIndex) => (
                  <Grid container className={classes.root} spacing={0}>
                    <Grid item xs={1}>
                      <SelectField
                        label="Set"
                        defaultValue={exercise.set}
                        name={`program[${workoutIndex}][${exerciseIndex}].set`}
                        array={setArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <SelectField
                        label={exercise.exerciseIntensity}
                        defaultValue={exercise.exerciseName}
                        name={`program[${workoutIndex}][${exerciseIndex}].exerciseName`}
                        array={arraySelect(exercise.exerciseType)}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <SelectField
                        label="Type"
                        defaultValue={exercise.resistanceType}
                        name={`program[${workoutIndex}][${exerciseIndex}].resistanceType`}
                        array={resistanceTypeArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <SelectField
                        label="Resistance"
                        defaultValue={exercise.resistance}
                        name={`program[${workoutIndex}][${exerciseIndex}].resistance`}
                        array={arraySelect(exercise.resistanceType)}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <SelectField
                        label="Sets"
                        defaultValue={exercise.sets}
                        name={`program[${workoutIndex}][${exerciseIndex}].sets`}
                        array={setsArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <SelectField
                        label="Reps"
                        defaultValue={exercise.numReps}
                        name={`program[${workoutIndex}][${exerciseIndex}].numReps`}
                        array={arraySelect(exercise.exerciseIntensity)}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <SelectField
                        label="Work"
                        defaultValue={exercise.workTime}
                        name={`program[${workoutIndex}][${exerciseIndex}].workTime`}
                        array={timeArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <SelectField
                        label="Rest"
                        defaultValue={exercise.restTime}
                        name={`program[${workoutIndex}][${exerciseIndex}].restTime`}
                        array={timeArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                ))}
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
