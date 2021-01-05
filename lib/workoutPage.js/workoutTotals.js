export default function workoutTotals(property, currentWorkout) {
  const { exercises } = currentWorkout;
  const total = exercises.reduce(function (a, b) {
    return a + b[property];
  }, 0);
  return total;
}
