/* eslint-disable no-nested-ternary */
import { increaseResistance } from './increaseResistance';
import { increaseReps } from './increaseReps';
import { setToBottomReps } from './setToBottomReps';

export const increaseRepsOrResistance = (exercise) => {
  const { numReps, exerciseIntensity, resistanceType, resistance } = exercise;
  const newExercise = exercise;
  let newNumReps;
  let newResistance;
  const lastSetReps = numReps;
  const lastSetRepsArray = [7, 10, 14];
  const isWarmup = exerciseIntensity === 'warmup';
  const isTopReps = lastSetRepsArray.includes(lastSetReps);
  console.log('increaseRepsOrResistance');
  if (isWarmup) {
    return newExercise;
  }
  if (isTopReps) {
    newResistance = increaseResistance(resistanceType, resistance);
    newNumReps = setToBottomReps(exerciseIntensity, numReps);
    newExercise.numReps = newNumReps;
    newExercise.resistance = newResistance;
    return newExercise;
  }
  newNumReps = increaseReps(numReps);
  newExercise.numReps = newNumReps;
  return newExercise;
};
