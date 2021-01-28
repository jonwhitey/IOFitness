import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  work: {
    color: 'green',
    width: '100%',
  },
  rest: {
    color: 'red',
    width: '100%',
  },
}));
export default function ExerciseCard(props) {
  const classes = useStyles();
  // liveGroup props
  const { 
    groupNum,
    setNum,
    workOrRest,
    exercise
    
  } = props;
  const setWorkOrRest = (workOrRest) => {
    if (workOrRest === 'work') {
      return classes.work;
    }
    if (workOrRest === 'rest') {
      return classes.rest;
    }
    return null;
  };
  return (
    <Card className={setWorkOrRest(workOrRest)}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom />
        <Typography variant="h5" component="h2">
          {exercise.exerciseName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Sets Remaining:
          {1}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Reps:
          {exercise.numReps}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Resistance:
          {exercise.resistance}
        </Typography>
        <Typography variant="body2" component="p">
          Queues: Lift dowel over head...
          <br />
          Nope, you fucked it up.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Workout</Button>
      </CardActions>
    </Card>
  );
}

ExerciseCard.propTypes = {
  groupNum: PropTypes.number,
  setNum: PropTypes.number,
  workOrRest: PropTypes.string,
  exercise: PropTypes.shape({
    exerciseName: PropTypes.string,
    numReps: PropTypes.number,
    workTime: PropTypes.number,
    restTime: PropTypes.number,
    resistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resistanceType: PropTypes.string,
  })
};
ExerciseCard.defaultProps = {
  groupNum: null,
  setNum: null,
  workOrRest: null,
  exercise: {
    exerciseName: null,
    numReps: null,
    workTime: null,
    restTime: null,
    resistance: null,
    resistanceType: null,
  }
};



