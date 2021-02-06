/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Howl } from 'howler';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import auth0 from '../lib/auth0';
import Layout from '../components/layout';
import { loginLocal, getTrainingSession } from '../lib/api/customer';
import sound1 from '../public/sounds/hero1.mp3';
import ExerciseCard from '../components/train/ExerciseCard';
import WorkoutTimer from '../components/train/SessionTimer';
import TimerControl from '../components/train/TimerControl';
import WorkoutTable from '../components/train/SessionTable';
import { executeTimerLogic } from '../lib/trainPage/timerLogic';

/* 
need to:
- go back through the logic of update liveGroup and work it out


I got it worked out. Wasn't working becuase:
- setNum and liveSetNumber track which exercise you're on within a group, not which set you're on
- js doesn't like the accumulators on non-initialized variables
- needed to create another variable to track sets - called completedRounds and liveCompletedRounds

Problems to fix:
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
function Train({ user, trainingSession }) {
  const loading = false;
  const { exercises: dbExcercises } = trainingSession;
  // console.log({ dbExcercises });

  const groupedExercises = dbExcercises.reduce((acc, exercise) => {
    const { groupNumber, totalSets } = exercise;
    const { exercises: currExercise = [] } = acc[groupNumber] || [];
    return {
      ...acc,
      [groupNumber]: {
        totalSets,
        exercises: [...currExercise, exercise],
      },
    };
  }, {});

  // In order for the timer to work, you need to know  //  - group num
  //  - set num
  //  - exer

  //  - next()
  //    - isGroupComplete()
  //    - isSetComplete()

  const [liveGroup, setLiveGroup] = useState({
    groupNum: 1,
    exerciseIndex: 0,
    workOrRest: 'start',
    setNumber: 1,
    totalSets: 3,
    exercise: groupedExercises[1].exercises[0],
  });

  const updateLiveGroup = (num) => {
    const updatedLiveGroup = executeTimerLogic(liveGroup, num, groupedExercises);
    setLiveGroup({
      ...updatedLiveGroup,
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
    <Layout user={user} trainingSession={trainingSession} loading={false}>
      <h1 align="center">Workout Page</h1>
      {loading && <p>Loading login info...</p>}
      {!trainingSession && <p> no workout</p>}
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
      <WorkoutTable trainingSession={trainingSession} liveGroupNumber={liveGroup.groupNum} />
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
    const { trainingSession } = await getTrainingSession({ localUser });

    if (!session || !session.user) {
      console.log('no sesssion and no user');
      // eslint-disable-next-line consistent-return
      return { props: { user: null } };
    }
    // eslint-disable-next-line consistent-return
    return {
      props: {
        user: session.user,
        trainingSession,
      },
    };
  } catch (e) {
    // eslint-disable-next-line consistent-return
    return { props: { user: session.user } };
  }
}

Train.propTypes = {
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

  trainingSession: PropTypes.shape({
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        exerciseName: PropTypes.string,
        exerciseNumber: PropTypes.number,
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

Train.defaultProps = {
  user: null,
  trainingSession: null,
};

export default Train;

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
