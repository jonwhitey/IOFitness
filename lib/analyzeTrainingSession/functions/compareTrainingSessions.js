/*
compareTrainingSessions function
  -compares the training session exercise array with eachother
  - if a user has completed an individual exercise at the same reps and resistance twice
  - add the exercise to the exercisesToProgress array
  - the progressExercises array is added to the   
*/

const isEqual = require('lodash.isequal');
const { change_IdToString } = require('./change_IdToString');
const { removeNonCompletedExercises } = require ('./removeNonCompletedExercises');

export const compareTrainingSessions = (lastCompletedSession, completedSession) => {
  // may need to add a [0] on lastCompletedSession[0].exercises
  console.log('COMPARETRAININGSESSIONS');
  const completedExercises = removeNonCompletedExercises(completedSession.exercises);
  const lastCompletedExercises = lastCompletedSession.exercises;

  console.log('exercise[8]')
  console.log(completedExercises[8]);
  console.log(lastCompletedExercises[8]);
  console.log(isEqual(completedExercises[8], lastCompletedExercises[8]))
  // I only want to progress completed exercise
  // if an exercise is not completed, do not add to progressed exercise array

  

  const exercisesToProgress = completedExercises.filter((exercise) =>
    lastCompletedExercises.some((exercise2) => {
      return isEqual(exercise, exercise2);
    }),
  );
  console.log(exercisesToProgress.length);
  /*

c

filter executes a callback function for each element in the array. 
the callback function is a pass/fail test.  
filter adds each passing element to a new array

my callback function test is array.some
array.some tests whether or not an element in the array passes a test
some returns true or false

1. for each element in the competedExercises,
2. run the test
3. is 

*/
  return exercisesToProgress;
};
// map over exercises
