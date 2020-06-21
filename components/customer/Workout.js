/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import notify from '../../lib/notifier';
import { theme } from '../../lib/theme';

const useStyles = makeStyles((theme) => ({
  table: {
    align: 'center',
    maxWidth: 850,
    minWidth: 300,
  },
  exercise: {
    paddingLeft: '10',
    size: 'small',
    color: 'red',
  },
  header: {
    backgroundColor: theme.primary.main.blue,
  },
}));

export default function Workout(props) {
  const classes = useStyles();
  // const { workout } = props;
  const { completeExercise } = props;
  const [{ workout }, setWorkout] = React.useState(props);
  /*
  React.useEffect(() => {
    setWorkout(props);
  }, [props]);
  */
  // console.log('training!');
  // console.log(workoutState.training);
  function handleCheck(e) {
    console.log(e.target.value);
    console.log('HandleCheck!');
    const workoutString = e.target.value;
    const workoutArray = workoutString.split('/');
    // const { setName, exerciseName, complete } = e.target;
    completeExercise(workoutArray[0], workoutArray[1], workoutArray[2]);
  }
  if (workout.training === undefined || workout.training.length === 0) {
    return (
      <div>
        <p> noTraining </p>
      </div>
    );
  }
  return (
    <div>
      <h1>{workout.name}</h1>
      <p>{workout.date}</p>
      {workout.training.map((t, setIndex) => (
        <TableContainer>
          <Table className={classes.table} aria-label="simple table" padding="none">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell
                  colSpan={5}
                  align="center"
                  padding="none"
                  size="small"
                  className={classes.setName}
                >
                  {t.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Complete</TableCell>
                <TableCell align="center">Exercise</TableCell>
                <TableCell align="center">Sets</TableCell>
                <TableCell align="center">Reps</TableCell>
                <TableCell align="center">Resistance</TableCell>
              </TableRow>
            </TableHead>
            {t.exercises.map((exercise, exerciseIndex) => (
              <TableBody>
                {exercise.set.map((row) => (
                  <TableRow>
                    <TableCell padding="checkbox" width="20%">
                      <Checkbox
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={exercise.complete}
                        onClick={handleCheck}
                        value={`${setIndex}/${exerciseIndex}/${exercise.complete}`}
                        key={t.index}
                      />
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {exercise.name}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.sets}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.reps.join(', ')}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.resistance.join(', ')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      ))}
    </div>
  );
}

Workout.propTypes = {
  completeExercise: PropTypes.function,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
  workout: {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    training: PropTypes.shape([
      {
        name: PropTypes.string,
        exercises: PropTypes.shape([
          {
            name: PropTypes.string,
            options: PropTypes.shape([
              {
                prgression: PropTypes.string,
              },
            ]),
            set: PropTypes.shape([
              {
                number: PropTypes.number,
                reps: PropTypes.array,
                resistance: PropTypes.array,
              },
            ]),
            equipment: PropTypes.string,
            workTime: PropTypes.number,
            restTime: PropTypes.number,
            complete: PropTypes.boolean,
          },
        ]),
      },
    ]),
  },
};

Workout.defaultProps = {
  user: '',
  workout: {},
};
