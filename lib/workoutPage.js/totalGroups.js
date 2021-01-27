export default function totalGroups(currentWorkout) {
  // eslint-disable-next-line prefer-spread
  return Math.max.apply(
    Math,
    currentWorkout.exercises.map(function (o) {
      return o.set;
    }),
  );
}
