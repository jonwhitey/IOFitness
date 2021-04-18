import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

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
export default function SessionTable(props) {
  const classes = useStyles();
  // liveGroup props
  const { trainingSession } = props;
  const { liveGroupNumber } = props;
  // timer settings
  console.log({ liveGroupNumber});
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
     

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Complete</TableCell>
            <TableCell>Group Number</TableCell>
            <TableCell>Exercise Name</TableCell>
            <TableCell align="right">Total Sets</TableCell>
            <TableCell align="right">Reps</TableCell>
            <TableCell align="right">Resistance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainingSession.exercises.map((exercise) => (
            <TableRow
              key={exercise.exerciseName}
              className={handleLiveGroupStyle(exercise.groupNumber)}
            >
              <TableCell align="right" className={classes.tCell}>
                <Checkbox
                checked={false}
                onChange={handleChange}
                name="checkedF"
                indeterminate
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
                {exercise.numReps}
              </TableCell>
              <TableCell align="right" className={classes.tCell}>
                {exercise.resistance}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
SessionTable.propTypes = {
  liveGroupNumber: PropTypes.number,
  trainingSession: PropTypes.shape({
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        exerciseNumber: PropTypes.number,
        exerciseName: PropTypes.string,
        totalSets: PropTypes.number,
        groupNumber: PropTypes.number,
        numReps: PropTypes.array,
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

SessionTable.defaultProps = {
  liveGroupNumber: 0,
  trainingSession: null,
};
