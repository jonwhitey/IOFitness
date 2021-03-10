/*
progressExercises function
- increase the reps or resistance of the exercisesToProgress array
-if the reps are less than the highest rep of the repScheme
-- increase the reps by 1
-else
-- increase the resistance by 1 level
-- decrease the reps to the lowest in the repScheme
repScheme
strengthReps - 5-7
hyperTrophyReps 8-12
enduranceReps 14-18
- returns the progressed exercises array
*/

import { increaseRepsOrResistance } from './increaseRepsOrResistance';

export const progressExercises = (exercisesToProgress) => {
  const progressedExercises = exercisesToProgress.map((exercise) =>
    increaseRepsOrResistance(exercise),
  );
  return progressedExercises;
};
