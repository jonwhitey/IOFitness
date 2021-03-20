/*
compareTrainingSessions function
  -compares the training session exercise array with eachother
  - if a user has completed an individual exercise at the same reps and resistance twice
  - add the exercise to the exercisesToProgress array
  - the progressExercises array is added to the   
*/

const isEqual = require('lodash.isequal');
const { change_IdToString } = require('./change_IdToString');

export const compileSessionExercises = (completedSession, progressExerciseArray) => {
  // may need to add a [0] on lastCompletedSession[0].exercises
  console.log('compileSessionExercises');
  console.log(completedSession);
  const completedExercises = completedSession.exercises;

  // create a new array
  // returns full session array of exercises with the progressed exercises merged into the array
  const newExercises = completedExercises.map((completedExercise) => {
       let progressedExercise = progressExerciseArray.find(pExercise => pExercise.exerciseName === completedExercise.exerciseName);
       return progressExerciseArray ? {...completedExercise, ...progressedExercise} : completedExercise;
    });

  return newExercises;
};
