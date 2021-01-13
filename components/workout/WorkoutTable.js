import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
}));
export default function WorkoutTable(props) {
  const classes = useStyles();
  // liveGroup props
  const { currentWorkout } = props;
  const { liveGroupNumber } = props;
  // timer settings

  // conditionally renders set rows by returning classes.set
  const handleLiveGroupStyle = (realGroupNumber) => {
    if (realGroupNumber === liveGroupNumber) {
      return classes.liveGroupStyle;
    }
    return classes[realGroupNumber];
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Set</TableCell>
            <TableCell>Exercisess</TableCell>
            <TableCell align="right">Sets</TableCell>
            <TableCell align="right">Reps</TableCell>
            <TableCell align="right">Resistance</TableCell>
            <TableCell align="right">Complete</TableCell>
            <TableCell>Work Time</TableCell>
            <TableCell>Rest Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentWorkout.exercises.map((set) => (
            <TableRow key={set.exerciseName} className={handleLiveGroupStyle(set.set)}>
              <TableCell component="th" scope="row" className={classes.tCell}>
                {set.set}
              </TableCell>
              <TableCell component="th" scope="row" className={classes.tCell}>
                {set.exerciseName}
              </TableCell>
              <TableCell align="right" className={classes.tCell}>
                {set.sets}
              </TableCell>
              <TableCell align="right" className={classes.tCell}>
                {set.numReps}
              </TableCell>
              <TableCell align="right" className={classes.tCell}>
                {set.resistance}
              </TableCell>
              <TableCell align="right" className={classes.tCell}>
                {set.complete}
              </TableCell>
              <TableCell component="th" scope="row" className={classes.tCell}>
                {set.workTime}
              </TableCell>
              <TableCell component="th" scope="row" className={classes.tCell}>
                {set.restTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
WorkoutTable.propTypes = {
  liveGroupNumber: PropTypes.number,
  currentWorkout: PropTypes.shape({
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        exerciseName: PropTypes.string,
        sets: PropTypes.number,
        set: PropTypes.number,
        numReps: PropTypes.number,
        resistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        resistanceType: PropTypes.string,
        complete: PropTypes.bool,
        workTime: PropTypes.number,
        restTime: PropTypes.number,
      }),
    ),
  }),
};

WorkoutTable.defaultProps = {
  liveGroupNumber: 0,
  currentWorkout: null,
};
