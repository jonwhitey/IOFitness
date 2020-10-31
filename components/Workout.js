/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../lib/theme';

const useStyles = makeStyles((theme) => ({
  table: {
    align: 'center',
    maxWidth: 500,
    minWidth: 300,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  headerCell: {
    color: 'white',
  },
  lowerHeaderCell: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}));

export default function Workout({ workout }) {
  const classes = useStyles();
  console.log('Workout Props');
  console.log(workout);

  function handleCheck(e) {
    console.log(e.target.value);
    console.log('HandleCheck!');
    const { uid } = workout;

    const workoutString = e.target.value;
    const workoutArray = workoutString.split('/');
    completeExercise(workoutArray[0], workoutArray[1], workoutArray[2]);
  }
  if (!workout || workout.training.length === 0) {
    return (
      <div>
        <p> No Training </p>
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
                  className={classes.headerCell}
                >
                  {t.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" padding="checkbox" className={classes.lowerHeaderCell}>
                  Complete
                </TableCell>
                <TableCell align="center" className={classes.lowerHeaderCell}>
                  Exercise
                </TableCell>
                <TableCell align="center" className={classes.lowerHeaderCell}>
                  Sets
                </TableCell>
                <TableCell align="center" className={classes.lowerHeaderCell}>
                  Reps
                </TableCell>
                <TableCell align="center" className={classes.lowerHeaderCell}>
                  Resistance
                </TableCell>
              </TableRow>
            </TableHead>
            {t.exercises.map((exercise, exerciseIndex) => (
              <TableBody>
                {exercise.sets.map((set) => (
                  <TableRow key={exercise.index}>
                    <TableCell align="left" padding="checkbox" width="20%">
                      <Checkbox
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={exercise.complete}
                        onClick={handleCheck}
                        value={`${setIndex}/${exerciseIndex}/${exercise.complete}`}
                        key={t.index}
                      />
                    </TableCell>
                    <TableCell align="center" width="20%" key={exercise.index}>
                      {exercise.name}
                    </TableCell>
                    <TableCell align="center" width="20%" key={set.index}>
                      {set.length}
                    </TableCell>
                    <TableCell align="center" width="20%" key={set.index}>
                      {set.numReps}
                    </TableCell>
                    <TableCell align="center" width="20%" key={set.index}>
                      {set.resistance}
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
