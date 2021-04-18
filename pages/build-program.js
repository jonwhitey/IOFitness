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

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '../components/layout';
import {serverSideHandler} from '../lib/serverSideHandler/serverSideHandler';
import SelectField from '../components/SelectField';
import { styleForm, styleTextField } from '../components/SharedStyles';
import { createMultipleTrainingSessions, loginLocal } from '../lib/api/customer';
import {
  groupArray,
  totalSetsArray,
  timeArray,
  resistanceTypeArray,
  arraySelect,
  exerciseIntensityArray,
  trueOrFalseArray,
} from '../server/models/DBFiles/buildWorkoutDefaults';
import { trainingSessions } from '../server/models/DBFiles/trainingSessions';

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
  const { user, error, isLoading } = useUser();
  const { localUser } = props;
  const classes = useStyles(props);
  const { register, handleSubmit, setValue, errors, control, watch } = useForm({
    defaultValues: {
      uid: user ? user.id : '',
      newTrainingSessions: trainingSessions,
    },
  });
  
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log('onSubmit!');
    const newTrainingSessions = data;
    console.log('onSubmit localUser');
    try {
      const response = await createMultipleTrainingSessions({ localUser, newTrainingSessions });
      console.log(response);
      router.push({ pathname: '/train', as: '/train' });
      return response;
    } catch (e) {
      return e;
    }
  };
  const handleMultiChange = (selectedOption) => {
    setValue('reactSelect', selectedOption);
  };
  // eslint-disable-next-line no-unused-vars
  const { newTrainingSessions } = watch();

  return (
    <Layout user={user} loading={false}>
      <h1 id="add-exercise">Build Your Training Session</h1>
      <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.root} spacing={2}>
          {trainingSessions.map((trainingSession, trainingSessionIndex) => (
            <Grid item xs={12} key={trainingSessionIndex}>
              <Paper align="center" className={classes.paper}>
                <TextField
                  style={styleTextField}
                  required
                  name={`newTrainingSessions[${trainingSessionIndex}].trainingSessionName`}
                  label="Session Name"
                  defaultValue={`Session ${trainingSessionIndex + 1}`}
                  autoFocus
                  inputRef={register}
                />
                {trainingSession.map((exercise, exerciseIndex) => (
                  <Grid container className={classes.root} spacing={0} key={exerciseIndex}>
                    <Grid item xs={1} >
                      <SelectField
                        label="Group"
                        defaultValue={exercise.groupNumber}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].groupNumber`}
                        array={groupArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <SelectField
                        label={exercise.exerciseIntensity}
                        defaultValue={exercise.exerciseName}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].exerciseName`}
                        array={arraySelect(exercise.exerciseType)}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={3} >
                      <SelectField
                        label="Type"
                        defaultValue={exercise.resistanceType}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].resistanceType`}
                        array={resistanceTypeArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1} >
                      <SelectField
                        label="Resistance"
                        defaultValue={exercise.resistance}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].resistance`}
                        array={arraySelect(exercise.resistanceType)}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1} >
                      <SelectField
                        label="totalSets"
                        defaultValue={exercise.totalSets}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].totalSets`}
                        array={totalSetsArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <SelectField
                        label="Reps"
                        defaultValue={exercise.numReps}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].numReps`}
                        array={arraySelect(exercise.exerciseIntensity)}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1} key={exerciseIndex+.9}>
                      <SelectField
                        label="exerciseIntensity"
                        defaultValue={exercise.exerciseIntensity}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].exerciseIntensity`}
                        array={exerciseIntensityArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <input type="hidden" ref={register({setValueAs: v => parseInt(v),})} name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].workTime`} />
                    <input type="hidden" ref={register({setValueAs: v => parseInt(v),})} name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].restTime`} />
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
  withPageAuthRequired();
  console.log('build-program getServerSideProps');
  console.log(req.props);
  return serverSideHandler(req, res);
}


BuildProgram.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
  trainingSessions: PropTypes.shape({
    trainingSession: PropTypes.arrayOf(
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
  trainingSessions: null,
  // progressions: null,
};

export default BuildProgram;
/*
<Grid item xs={1}>
                      <SelectField
                        label="Work"
                        defaultValue={exercise.workTime}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].workTime`}
                        array={timeArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={1} key={exerciseIndex+.8}>
                      <SelectField
                        label="Rest"
                        defaultValue={exercise.restTime}
                        name={`newTrainingSessions[${trainingSessionIndex}][${exerciseIndex}].restTime`}
                        array={timeArray}
                        control={control}
                        handleMultiChange={handleMultiChange}
                        errors={errors}
                      />
                    </Grid>
                    */