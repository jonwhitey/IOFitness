/* eslint-disable no-nested-ternary */
import increaseRepsOrResistance from './functions/increaseResistance';
import { compareTrainingSessions } from './functions/compareTrainingSessions';
import { compileSessionExercises } from './functions/compileSessionExercises';

import { progressExercises } from './functions/progressExercises';
import { isFirstTrainingSession } from './functions/isFirstTrainingSession';
import { repeatSession } from './functions/repeatSession';
import { createNextSession } from './functions/createNextSession';
/*
analyzeTrainingSessions 
- used after completing a training session
- if it is the first time a user completed a trainingSession, return the same session
- compareTrainingSessions takes the last 2 completed trainingSessions with the same name
= if an exercise has been completed twice, returns an array of exercisesToProgress
- progressExercises takes exercisesToProgress and makes them more difficult
- createNextSession takes the progressedExercises and creeates a new session
= nextSession is returned to the client to be saved
*/

export const analyzeTrainingSessions = (lastCompletedSession, completedSession) => {
  console.log('ANALyze');
  if (isFirstTrainingSession(lastCompletedSession, completedSession)) {
    const nextSession = repeatSession(completedSession);
    console.log('REPEAT SESSION');
    return nextSession;
  }

  const exercisesToProgress = compareTrainingSessions(lastCompletedSession, completedSession);
  console.log("EXERCISESTOPROGRESS.length")
  console.log(exercisesToProgress.length);
  const progressedExerciseArray = progressExercises(exercisesToProgress);

  // if an exercise in last completed session, is not in progressed exercise array, add it to to the new array
  // need to add a nextSessionExercises instead of progressedExerciseArray
  const nextSessionExercises = compileSessionExercises(completedSession, progressedExerciseArray);

  const nextTrainingSession = createNextSession(completedSession, nextSessionExercises);
  nextTrainingSession.completed = false;
  nextTrainingSession.date = Date.now();

  return nextTrainingSession;
};
