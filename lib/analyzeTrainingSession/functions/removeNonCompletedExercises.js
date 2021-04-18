export const removeNonCompletedExercises = (exerciseArray) => {

    const completedExercises = exerciseArray.filter(exercise => exercise.complete === true );
    return completedExercises;
}