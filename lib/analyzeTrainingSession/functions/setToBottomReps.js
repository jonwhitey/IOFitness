/* eslint-disable no-nested-ternary */
export const setToBottomReps = (exerciseIntensity, numReps) => {
  const isHypertrophy = exerciseIntensity === 'hypertrophy';
  const isEndurance = exerciseIntensity === 'endurance';
  const isStrength = exerciseIntensity === 'strength';
  const isFinisher = exerciseIntensity === 'finisher';
  const bottomReps = isStrength
    ? 5
    : isHypertrophy
    ? 8
    : isEndurance || isFinisher
    ? 12
    : numReps;
  return bottomReps;
};
