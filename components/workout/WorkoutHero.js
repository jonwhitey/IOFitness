
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

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
export default function WorkoutHero(props) {
  const classes = useStyles();
  // liveGroup props
  const { liveGroup } = props;
  const { updateLiveGroup } = props;
  // timer props
  const { isPlaying } = props;
  const { renderTime } = props;
  const { pause } = props;
  const { key } = props;
  const { handleKey } = props;
  const { sound } = props;
  console.log('WORKOUT HERO');
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
    <Grid container alignItems="center" spacing={5}>
      <Grid item xs={4} align="center">
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={liveGroup.duration}
          colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
          onComplete={() => {
            updateLiveGroup();
            handleKey();
            return [true, 1000];
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </Grid>
      <Grid item xs={4} align="center">
        <Button fullWidth variant="outlined" onClick={pause}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button fullWidth variant="outlined" onClick={updateLiveGroup}>
          Prev Set!
        </Button>
        <Button fullWidth variant="outlined" onClick={updateLiveGroup}>
          Next Set!
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            sound.play();
          }}
        >
          Play Sound
        </Button>
      </Grid>
      <Grid item xs={4}>
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
      </Grid>
    </Grid>
  );
}
