import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Howl } from 'howler';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import auth0 from '../lib/auth0';
import Layout from '../components/layout';
import { loginLocal, getProgram } from '../lib/api/customer';
import sound1 from '../public/sounds/hero1.mp3';
import ExerciseCard from '../components/workout/ExerciseCard';
import WorkoutTimer from '../components/workout/WorkoutTimer';
import TimerControl from '../components/workout/TimerControl';
import WorkoutTable from '../components/workout/WorkoutTable';

/* 

I got it worked out. Wasn't working becuase:
- setNum and liveSetNum track which exercise you're on within a group, not which set you're on
- js doesn't like the accumulators on non-initialized variables
- needed to create another variable to track sets - called completedRounds and liveCompletedRounds

Problems to fix:
- need to get groups, sets, and rounds figured out
- need to write some logic for increasing reps and resistance - find my rules
  - 2x2
  - increase a rep until you hit strength, hypertrophy, endurance threshold
  - then increase resistance
  - rules for isometric exercises
  - rest week
- then create a final-ish data model
- load in my workout x 2
- get ui working
- save and create next workout / training session  


*/
function Workout({ user, currentWorkout }) {
  const loading = false;
  const { exercises: dbExcercises } = currentWorkout;
  // console.log({ dbExcercises });

  const groupedBySets = dbExcercises.reduce((acc, ex) => {
    const { set: group, sets: numSets } = ex;
    const { sets: currSets = [] } = acc[group] || [];
    return {
      ...acc,
      [group]: {
        numSets,
        sets: [...currSets, ex],
      },
    };
  }, {});

  // console.log({ groupedBySets });

  // In order for the timer to work, you need to know
  //  - group num
  //  - set num
  //  - exer

  //  - next()
  //    - isGroupComplete()
  //    - isSetComplete()

  const getFirstExercise = () => {
    return dbExcercises[0];
  };

  const [liveGroup, setLiveGroup] = useState({
    groupNum: 1,
    setNum: 0,
    exercise: dbExcercises[0],
    workOrRest: 'work',
    completedRounds: 0,
  });
  console.log(groupedBySets);
  // setNum is really exerciseNum
  // setsComplete 
  const updateLiveGroup = () => {
    const {
      groupNum: liveGroupNum,
      setNum: liveSetNum,
      exercise: liveExercise,
      workOrRest: liveWorkOrRest,
      completedRounds: liveCompletedRounds,
    } = liveGroup;
    const totalNumSets = groupedBySets[liveGroupNum].numSets;
    const isLastRound = liveCompletedRounds === totalNumSets;

    const { _id: liveExcID } = liveExercise;
    // console.log({ liveSetNum: groupedBySets[liveSetNum].sets });
    // numExercises
    const setLength = groupedBySets[liveGroupNum].sets.length;
    console.log(setLength);
    const isLastExc = groupedBySets[liveGroupNum].sets[setLength - 1]._id === liveExcID;
    console.log(groupedBySets[liveGroupNum].sets[setLength - 1]._id);
    const isRest = liveWorkOrRest === 'rest';

    const isGroupComplete = () => {
      console.log({
        isLastRound,
        isLastExc,
        isRest,
      });
      return isLastRound && isLastExc && isRest;
    };
    // add is last group
    const groupNum = isGroupComplete() ? liveGroupNum + 1 : liveGroupNum;
    console.log(liveSetNum);
    const setNum = !isRest ? liveSetNum : isLastExc ? 0 : liveSetNum + 1;
    console.log(setNum);
    const exercise = groupedBySets[groupNum].sets[setNum];
    console.log(exercise);
    const completedRounds = isRest && isLastExc ? liveCompletedRounds + 1 : liveCompletedRounds

    const workOrRest = liveWorkOrRest === 'rest' ? 'work' : 'rest';

    //

    return setLiveGroup({
      groupNum,
      setNum,
      exercise,
      workOrRest,
      completedRounds,
    });
  };

  const [key, setKey] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const sound = new Howl({
    src: [sound1],
    volume: 1,
    onend() {},
  });

  const handleKey = () => {
    setKey(key + 1);
  };

  // pause timer;
  const pause = () => {
    return setIsPlaying(!isPlaying);
  };

  const timerProps = {
    key,
    isPlaying,
    duration: 2,
    // duration: liveGroup.duration,
    updateLiveGroup,
    handleKey,
  };

  return (
    <Layout user={user} currentWorkout={currentWorkout} loading={false}>
      <h1 align="center">Workout Page</h1>
      {loading && <p>Loading login info...</p>}
      {!currentWorkout && <p> no workout</p>}
      <Grid container alignItems="center" spacing={5}>
        <Grid item xs={4} align="center">
          <WorkoutTimer timerProps={timerProps} />
          <TimerControl pause={pause} isPlaying={isPlaying} updateLiveGroup={updateLiveGroup} />
        </Grid>
        <Grid item xs={4}>
          <ExerciseCard {...liveGroup} />
        </Grid>
      </Grid>
      <br />
      <WorkoutTable currentWorkout={currentWorkout} liveGroupNumber={liveGroup.liveGroupNumber} />
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
    const { localUser } = await loginLocal({ user });
    const { program } = await getProgram({ localUser });
    const currentWorkout = program.workouts.find((nextWorkout) => nextWorkout.completed === false);

    if (!session || !session.user) {
      console.log('no sesssion and no user');
      // eslint-disable-next-line consistent-return
      return { props: { user: null } };
    }
    // eslint-disable-next-line consistent-return
    return {
      props: {
        user: session.user,
        currentWorkout,
      },
    };
  } catch (e) {
    // eslint-disable-next-line consistent-return
    return { props: { user: session.user } };
  }
}

Workout.propTypes = {
  user: PropTypes.shape({
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    nickname: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string,
    locale: PropTypes.string,
    updated_at: PropTypes.string,
    email: PropTypes.string,
    email_verified: PropTypes.bool,
    sub: PropTypes.string,
  }),

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

Workout.defaultProps = {
  user: null,
  currentWorkout: null,
};

export default Workout;

/* Create an exercise object where each key is the ID of the exercise and it's respective properties

  */
// const exercises = dbExcercises.reduce((accum, {
//   _id,
//   exerciseName,
//   resistanceType
// }) => {
//   return {
//     ...accum,
//     [_id]: {exerciseName, resistanceType}
//   }
// },
// {})

// const groupedBySetsAndSet = Object.entries(groupedBySets).map(([numSets, sets]) => {

// })
