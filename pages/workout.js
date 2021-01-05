import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Howl } from 'howler';
import auth0 from '../lib/auth0';
import Layout from '../components/layout';
import { loginLocal, getProgram } from '../lib/api/customer';
import sound1 from '../public/sounds/hero1.mp3';

// import Workout from '../components/Workout';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
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
  liveSetStyle: {
    backgroundColor: '#02C769',
  },
  tCell: {
    color: 'white',
  },
  work: {
    color: 'green',
    width: '100%',
  },
  rest: {
    color: 'red',
    width: '100%',
  },
}));

/* to do: 
  clean this up
  make the workout card a component
  make the timer and the buttons a component
  make the workout grid a component
  make the buttons work to reverse and more the sets forward
  make the updateLiveGroup a lib function
  push to github
  kill it, you got this
  */

function Workout({ user, currentWorkout }) {
  const classes = useStyles();
  const loading = false;
  const [key, setKey] = useState(1);
  const [timer, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveGroup, setLiveGroup] = useState({
    liveGroupNumber: 0,
    group: [],
    numberOfExercisesInGroup: 0,
    setsRemaining: 0,
    liveExerciseIndex: 0,
    liveExercise: {},
    duration: 5,
    workOrRest: 'start',
  });
  const sound = new Howl({
    src: [sound1],
    volume: 1,
    onend() {
      console.log('Finished!');
    },
  });
  console.log(liveGroup);

  const { exercises } = currentWorkout;
  const findNextGroup = () => {
    return exercises.filter((exercises) => exercises.set === liveGroup.liveGroupNumber + 1);
  };

  const updateLiveGroup = () => {
    sound.play();
    // if on rest and last exercise in group, decrease sets remaining, and switch to starting exercise
    if (
      liveGroup.setsRemaining > 1 &&
      liveGroup.workOrRest === 'rest' &&
      liveGroup.liveExerciseIndex + 1 === liveGroup.numberOfExercisesInGroup
    ) {
      return setLiveGroup({
        ...liveGroup,
        liveExerciseIndex: 0,
        setsRemaining: liveGroup.setsRemaining - 1,
        liveExercise: liveGroup.group[0],
        workOrRest: 'work',
        duration: liveGroup.group[0].workTime,
      });
    }
    // if rest and not last exercise in group and not last set and  in the group, switch exercise
    if (
      liveGroup.workOrRest === 'rest' &&
      liveGroup.setsRemaining >= 1 &&
      liveGroup.liveExerciseIndex + 1 !== liveGroup.numberOfExercisesInGroup
    ) {
      return setLiveGroup({
        ...liveGroup,
        liveExerciseIndex: liveGroup.liveExerciseIndex + 1,
        liveExercise: liveGroup.group[liveGroup.liveExerciseIndex + 1],
        workOrRest: 'work',
        duration: liveGroup.group[liveGroup.liveExerciseIndex + 1].workTime,
      });
    }
    // if work switch to rest
    if (liveGroup.setsRemaining > 0 && liveGroup.workOrRest === 'work') {
      return setLiveGroup({
        ...liveGroup,
        duration: liveGroup.group[liveGroup.liveExerciseIndex].restTime,
        workOrRest: 'rest',
      });
    }
    // if workOrRest === start, set the new live group
    // if setsRemaining === 1 and it is the last excercise in the group, and on rest, switch to a new group
    if (
      liveGroup.workOrRest === 'start' ||
      (liveGroup.setsRemaining === 1 &&
        liveGroup.liveExerciseIndex + 1 === liveGroup.numberOfExercisesInGroup &&
        liveGroup.workOrRest === 'rest')
    ) {
      const newLiveGroup = findNextGroup();
      console.log(newLiveGroup);
      return setLiveGroup({
        ...liveGroup,
        liveGroupNumber: liveGroup.liveGroupNumber + 1,
        group: newLiveGroup,
        liveExerciseIndex: 0,
        liveExercise: newLiveGroup[0],
        setsRemaining: newLiveGroup[0].sets,
        workOrRest: 'work',
        duration: newLiveGroup[0].workTime,
        numberOfExercisesInGroup: newLiveGroup.length,
      });
    }
    return liveGroup;
  };

  // conditionally renders set rows by returning classes.set
  const setClass = (liveClass) => {
    if (liveClass === liveGroup.liveGroupNumber) {
      return classes.liveSetStyle;
    }
    return classes[liveClass];
  };

  const setWorkOrRest = (workOrRest) => {
    if (workOrRest === 'work') {
      return classes.work;
    }
    if (workOrRest === 'rest') {
      return classes.rest;
    }
    return null;
  };

  // timer settings
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Next Set!</div>;
    }
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  // pause timer;
  const pause = () => {
    if (isPlaying) {
      return setIsPlaying(false);
    }
    return setIsPlaying(true);
  };

  return (
    <Layout user={user} currentWorkout={currentWorkout} loading={false}>
      <h1 align="center">Workout Page</h1>
      <Grid container alignItems="center" spacing={5}>
        <Grid item xs={4} align="center">
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={liveGroup.duration}
            colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
            onComplete={() => {
              updateLiveGroup();
              setKey(key + 1);
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
      <br />
      {loading && <p>Loading login info...</p>}
      {!currentWorkout && <p> no workout</p>}
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
              <TableRow key={set.exerciseName} className={setClass(set.set)}>
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
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    console.log('no sesssion and no user');
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  const { user } = session;
  try {
    console.log('Workout SSP');
    const { localUser } = await loginLocal({ user });
    console.log('calling getProgram');
    const { program } = await getProgram({ localUser });
    const currentWorkout = program.workouts.find((nextWorkout) => nextWorkout.completed === false);

    console.log(program);
    if (!session || !session.user) {
      console.log('no sesssion and no user');
      // eslint-disable-next-line consistent-return
      return { props: { user: null } };
    }
    // eslint-disable-next-line consistent-return
    return {
      props: {
        user: session.user,
        localUser,
        program,
        currentWorkout,
      },
    };
  } catch (e) {
    // eslint-disable-next-line consistent-return
    return { props: { user: session.user } };
  }
}

export default Workout;
