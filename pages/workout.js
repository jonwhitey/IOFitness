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

/* to do: 
  clean this up
  get currentWorkout not currentProgram
  make the buttons work to reverse and more the sets forward
  make the updateLiveGroup a lib function
  push to github
  kill it, you got this
  */

function Workout({ user, currentWorkout }) {
  const loading = false;
  const { exercises: dbExcercises } = currentWorkout;

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
  console.log({dbExcercises})

  const groupedBySets = dbExcercises.reduce((acc, ex)=>{
    const {set: group, sets: numSets} = ex
    const {sets: currSets = []} = acc[group] || [] 
    return {
      ...acc,
      [group] : {
        numSets,
        sets: [...currSets, ex]
      }
    }
  }, {})

  // const groupedBySetsAndSet = Object.entries(groupedBySets).map(([numSets, sets]) => {

  // })

  console.log({groupedBySets})

  // In order for the timer to work, you need to know 
  //  - group num 
  //  - set num
  //  - exer
  
  //  - next()
  //    - isGroupComplete()
  //    - isSetComplete()

  const getFirstExercise = () => {
    return dbExcercises[0]
  }

  const [liveGroup, setLiveGroup] = useState({
    groupNum: 1,
    setNum: 1,
    exercise: dbExcercises[0],
    workOrRest: 'rest'
  });

  const updateLiveGroup = () => {
    const {
      groupNum: liveGroupNum,
      setNum: liveSetNum,
      exercise: liveExercise,
      workOrRest: liveWorkOrRest
    } = liveGroup;

    const totalNumSets = groupedBySets[liveSetNum].numSets
    const isLastSet = liveSetNum == totalNumSets

    const {_id: liveExcID} = liveExercise
    console.log({liveSetNum: groupedBySets[liveSetNum].sets})
    const setLength = groupedBySets[liveSetNum].sets.length
    const isLastExc = groupedBySets[liveSetNum].sets[setLength-1]._id == liveExcID;

    const isRest = liveWorkOrRest == "rest"

    const isGroupComplete = () => {
      console.log({
        isLastSet,
        isLastExc,
        isRest
      })
      return isLastSet && isLastExc && isRest
    }
    
    // add is last group
    const groupNum = isGroupComplete() ? liveGroupNum++ : liveGroupNum
    
    const setNum = !isRest ? liveSetNum : (isGroupComplete ? 1 : liveSetNum++)

    const exercise = groupedBySets[groupNum].sets[setNum]

    const workOrRest = liveWorkOrRest == "rest" ? "work" : "rest"

     return setLiveGroup({
       groupNum,
       setNum,
       exercise,
       workOrRest,     
     })
  }
  


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
    return setIsPlaying(!isPlaying)
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

  










  // const findNextGroup = () => {
  //   return exercises.filter((exercise) => exercise.set === liveGroup.liveGroupNumber + 1);
  // };
  // switch to first exercise in group
  // switch to next exercise within group
  // switch work to rest
  // switch group or intialize first group

  // const updateLiveGroup = () => {
  //   sound.play();
  //   // if on rest and last exercise in group, decrease sets remaining, and switch to starting exercise
  //   if (
  //     liveGroup.setsRemaining > 1 &&
  //     liveGroup.workOrRest === 'rest' &&
  //     liveGroup.liveExerciseIndex + 1 === liveGroup.numberOfExercisesInGroup
  //   ) {
  //     return setLiveGroup({
  //       ...liveGroup,
  //       liveExerciseIndex: 0,
  //       setsRemaining: liveGroup.setsRemaining - 1,
  //       liveExercise: liveGroup.group[0],
  //       workOrRest: 'work',
  //       duration: liveGroup.group[0].workTime,
  //     });
  //   }
  //   // if rest and not last exercise in group and not last set and  in the group, switch exercise
  //   if (
  //     liveGroup.workOrRest === 'rest' &&
  //     liveGroup.setsRemaining >= 1 &&
  //     liveGroup.liveExerciseIndex + 1 !== liveGroup.numberOfExercisesInGroup
  //   ) {
  //     return setLiveGroup({
  //       ...liveGroup,
  //       liveExerciseIndex: liveGroup.liveExerciseIndex + 1,
  //       liveExercise: liveGroup.group[liveGroup.liveExerciseIndex + 1],
  //       workOrRest: 'work',
  //       duration: liveGroup.group[liveGroup.liveExerciseIndex + 1].workTime,
  //     });
  //   }
  //   // if work switch to rest
  //   if (liveGroup.setsRemaining > 0 && liveGroup.workOrRest === 'work') {
  //     return setLiveGroup({
  //       ...liveGroup,
  //       duration: liveGroup.group[liveGroup.liveExerciseIndex].restTime,
  //       workOrRest: 'rest',
  //     });
  //   }
  //   // if workOrRest === start, set the new live group
  //   // if setsRemaining === 1 and it is the last excercise in the group, and on rest, switch to a new group
  //   if (
  //     liveGroup.workOrRest === 'start' ||
  //     (liveGroup.setsRemaining === 1 &&
  //       liveGroup.liveExerciseIndex + 1 === liveGroup.numberOfExercisesInGroup &&
  //       liveGroup.workOrRest === 'rest')
  //   ) {
  //     const newLiveGroup = findNextGroup();
  //     return setLiveGroup({
  //       ...liveGroup,
  //       liveGroupNumber: liveGroup.liveGroupNumber + 1,
  //       group: newLiveGroup,
  //       liveExerciseIndex: 0,
  //       liveExercise: newLiveGroup[0],
  //       setsRemaining: newLiveGroup[0].sets,
  //       workOrRest: 'work',
  //       duration: newLiveGroup[0].workTime,
  //       numberOfExercisesInGroup: newLiveGroup.length,
  //     });
  //   }
  //   return liveGroup;
  // };