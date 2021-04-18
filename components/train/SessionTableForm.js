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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import {serverSideHandler} from '../../lib/serverSideHandler/serverSideHandler';
import SelectField from '../SelectField';
import { styleForm, styleTextField } from '../SharedStyles';
import { createMultipleTrainingSessions, loginLocal } from '../../lib/api/customer';
import {
  groupArray,
  totalSetsArray,
  timeArray,
  resistanceTypeArray,
  arraySelect,
  exerciseIntensityArray,
  trueOrFalseArray,
} from '../../server/models/DBFiles/buildWorkoutDefaults';
import { trainingSessions } from '../../server/models/DBFiles/trainingSessions';
import { completeTrainingSession } from '../../lib/api/customer';

const useStyles = makeStyles((theme) => ({
  1: {
    backgroundColor: '#011f4b',
    color: 'white',
  },
  2: {
    backgroundColor: '#03396c',
    color: 'white',
  },
  3: {
    backgroundColor: '#005b96',
    color: 'white',
  },
  4: {
    backgroundColor: '#6497b1',
    color: 'white',
  },
  5: {
    backgroundColor: '#011f4b',
    color: 'white',
  },
  6: {
    backgroundColor: '#03396c',
    color: 'white',
  },
  7: {
    backgroundColor: '#005b96',
    color: 'white',
  },
  8: {
    backgroundColor: '#6497b1',
    color: 'white',
  },
  9: {
    backgroundColor: '#011f4b',
    color: 'white',
  },
  10: {
    backgroundColor: '#03396c',
    color: 'white',
  },
  11: {
    backgroundColor: '#005b96',
    color: 'white',
  },
  12: {
    backgroundColor: '#6497b1',
    color: 'white',
  },
  liveGroupStyle: {
    backgroundColor: '#02C769',
  },
  tCell: {
    color: 'white',
  },
  TableRow: {
    height: '20px',
  }
}));

export default function SessionTableForm(props) {
    const classes = useStyles();
    // liveGroup props
    const { trainingSession } = props;
    const { liveGroupNumber } = props;
    const { localUser } = props;
     

    // timer settings
    console.log({ liveGroupNumber});
    //console.log(trainingSession);
    // conditionally renders set rows by returning classes.set
    const handleLiveGroupStyle = (realGroupNumber) => {
      if (realGroupNumber === liveGroupNumber) {
        return classes.liveGroupStyle;
      }
      return classes[realGroupNumber];
    };
  
    // handle change... add to completedExerciseArray if changed to true
    // remove from completedExerciseArray if false
    // check all option
  
    const handleChange = {};
  
  const { register, handleSubmit, setValue, errors, control, watch } = useForm({
    defaultValues: {
      uid: localUser ? localUser.id : '',
      liveTrainingSession: trainingSession,
    },
  });
  
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log('onSubmit!');
    const { liveTrainingSession } = data;
    console.log('onSubmit localUser');
    console.log(liveTrainingSession);
    
    try {
      const isComplete = await completeTrainingSession({ localUser, liveTrainingSession });
      if (isComplete) {
        router.reload();
        return;
      }
    } catch (e) {
      console.log(e);
    }
    
  };
  const handleMultiChange = (selectedOption) => {
    setValue('reactSelect', selectedOption);
  };
  // eslint-disable-next-line no-unused-vars
  const { liveTrainingSession } = watch();

  const completeAll = (event, data) => {
    console.log('completeAll');
    const toggleComplete = !liveTrainingSession.complete
    setValue('liveTrainingSession.complete', toggleComplete);
    trainingSession.exercises.forEach((exercise, exerciseIndex) => {
      setValue(`liveTrainingSession.exercises[${exerciseIndex}].complete`, toggleComplete);
    });
  };

  return (
    <div>
      <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">
                <Controller
                      name={`liveTrainingSession.complete`}
                      defaultValue={trainingSession.complete}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => completeAll(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                    Complete</TableCell>
                <TableCell>Group Number</TableCell>
                <TableCell>Exercise Name</TableCell>
                <TableCell align="right">Total Sets</TableCell>
                <TableCell align="right">Reps</TableCell>
                <TableCell align="right">Resistance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingSession.exercises.map((exercise, exerciseIndex) => (
                <TableRow
                  key={exercise.exerciseName}
                  className={handleLiveGroupStyle(exercise.groupNumber)}
                >
                  <TableCell align="right" className={classes.tCell}>
                    <input type="hidden" ref={register} name={`liveTrainingSession.exercises[${exerciseIndex}].exerciseName`} />
                    <input type="hidden" ref={register({setValueAs: v => parseInt(v),})} name={`liveTrainingSession.exercises[${exerciseIndex}].exerciseNumber`}/>
                    <input type="hidden" ref={register({setValueAs: v => parseInt(v),})} name={`liveTrainingSession.exercises[${exerciseIndex}].totalSets`} />
                    <input type="hidden" ref={register({setValueAs: v => parseInt(v),})} name={`liveTrainingSession.exercises[${exerciseIndex}].groupNumber`} />
                    <input type="hidden" ref={register} name={`liveTrainingSession.exercises[${exerciseIndex}].resistanceType`} />
                    <input type="hidden" ref={register({setValueAs: v => parseInt(v),})} name={`liveTrainingSession.exercises[${exerciseIndex}].workTime`} />
                    <input type="hidden" ref={register({setValueAs: v => parseInt(v),})} name={`liveTrainingSession.exercises[${exerciseIndex}].restTime`} />
                    <input type="hidden" ref={register} name={`liveTrainingSession.exercises[${exerciseIndex}].exerciseIntensity`} />
                    <Controller
                      name={`liveTrainingSession.exercises[${exerciseIndex}].complete`}
                      defaultValue={exercise.complete}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tCell}>
                    {exercise.groupNumber}
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tCell}>
                    {exercise.exerciseName}
                  </TableCell>
                  <TableCell align="right" className={classes.tCell}>
                    {exercise.totalSets}
                  </TableCell>
                  <TableCell align="right" className={classes.tCell}>
                    <SelectField
                            defaultValue={exercise.numReps}
                            name={`liveTrainingSession.exercises[${exerciseIndex}].numReps`}
                            array={arraySelect(exercise.exerciseIntensity)}
                            control={control}
                            handleMultiChange={handleMultiChange}
                            errors={errors}
                            className={classes.tCell}
                          />              
                </TableCell>
                  <TableCell align="right" className={classes.tCell}>
                  <SelectField
                            defaultValue={exercise.resistance}
                            name={`liveTrainingSession.exercises[${exerciseIndex}].resistance`}
                            array={arraySelect(exercise.resistanceType)}
                            control={control}
                            handleMultiChange={handleMultiChange}
                            errors={errors}
                            className={classes.tCell}
                          />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <input type="hidden" ref={register} name={`liveTrainingSession._id`} />
        <input type="hidden" ref={register} name={`liveTrainingSession.date`} />
        <input type="hidden" ref={register} name={`liveTrainingSession.uid`} />
        <input type="hidden" ref={register} name={`liveTrainingSession.trainingSessionName`} />
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
      <DevTool control={control}/> 
    </div>
  );
}

export async function getServerSideProps({ req, res }) {  
  withPageAuthRequired();
  return serverSideHandler(req, res);
}


SessionTableForm.propTypes = {
    liveGroupNumber: PropTypes.number,
    trainingSession: PropTypes.shape({
      exercises: PropTypes.arrayOf(
        PropTypes.shape({
          exerciseNumber: PropTypes.number,
          exerciseName: PropTypes.string,
          totalSets: PropTypes.number,
          groupNumber: PropTypes.number,
          numReps: PropTypes.number,
          resistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          resistanceType: PropTypes.string,
          setsCompleted: PropTypes.number,
          complete: PropTypes.bool,
          workTime: PropTypes.number,
          restTime: PropTypes.number,
        }),
      ),
    }),
};

SessionTableForm.defaultProps = {
  user: null,
  trainingSessions: null,
  // progressions: null,
};
