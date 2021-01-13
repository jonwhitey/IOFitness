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
  const { liveGroup } = props;
  console.log(liveGroup);
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
    <Card className={setWorkOrRest(liveGroup.workOrRest)}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom />
        <Typography variant="h5" component="h2">
          {liveGroup.liveExercise.exerciseName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Sets Remaining:
          {liveGroup.setsRemaining}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Reps:
          {liveGroup.liveExercise.numReps}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Resistance:
          {liveGroup.liveExercise.resistance}
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
  liveGroup: PropTypes.shape({
    setsRemaining: PropTypes.number,
    workOrRest: PropTypes.string,
    liveExercise: PropTypes.shape({
      exerciseName: PropTypes.string,
      numReps: PropTypes.number,
      workTime: PropTypes.number,
      restTime: PropTypes.number,
      resistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      resistanceType: PropTypes.string,
    }),
  }),
};

ExerciseCard.defaultProps = {
  liveGroup: PropTypes.shape({
    setsRemaining: 1,
    workOrRest: 'Work',
    liveExercise: PropTypes.shape({
      exerciseName: 'Exercise',
      numReps: 10,
      workTime: 30,
      restTime: 30,
      resistance: 0,
      resistanceType: 'lbs',
    }),
  }),
};
