/*
compareTrainingSessions function
  - takes the completedSession and the progressExerciseArray
  - iterate over the completed exercise array
  - if the the exerciseName is in the progressExerciseArray,
  - 
*/

export const compileSessionExercises = (completedSession, progressedExerciseArray) => {
  // may need to add a [0] on lastCompletedSession[0].exercises
  
  const completedExercises = completedSession.exercises;
  
  // create a new array
  // returns full session array of exercises with the progressed exercises merged into the array
  // for each exercise in a completedSession,
  // check to see if the exercise is in the progressed exercise array
  // 
 
  const newExercises= completedExercises.map((completedExercise) => {
       let progressedExercise = progressedExerciseArray.find(pExercise => pExercise.exerciseName === completedExercise.exerciseName);
       //console.log(progressedExercise);
       const isExerciseProgressed = progressedExercise != undefined;
       
       return isExerciseProgressed ? { ...progressedExercise, complete: false } : {...completedExercise, complete: false};
    });
  
  //const newExercises = newExercisesWithId.map(({_id, ...rest})=> rest);
  return newExercises;
};
