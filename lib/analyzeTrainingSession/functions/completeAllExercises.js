export const completeAllExercises = (completeMe, dataType) => {
    console.log('completeAllExercises 2');
    console.log(typeof(completeMe));
    console.log(typeof(completeMe.exercises));
    if (dataType === 'trainingSession') {
    const completedExerciseArray = completeMe.exercises.map(exercise => ({
        ...exercise, complete: true
      }));
    console.log('completeAllExercises');
    completeMe.exercises = completedExerciseArray;  
    return completeMe;
    }
    if (dataType === 'exercises') {
      console.log('completeMe is array');
      const completedExercises = completeMe.map(exercise => ({
        ...exercise, complete: true
      }))
      return completedExercises; 
    }
    if (dataType === 'exercise') {
      completeMe.complete = true;
      return completeMe;
    } 
    else {
      completeMe = completeMe;
      return console.log('ERROR' + dataType);
    }
};