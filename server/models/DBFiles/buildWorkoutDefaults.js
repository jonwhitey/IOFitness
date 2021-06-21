import range from 'lodash.range';
import { trainingSessions } from './trainingSessions';

const lowerBody = [
  'Back Squat',
  'Goblet Squat',
  'Deadlift',
  'Single Leg Squat',
  'Lunge',
  'RDL',
  'Single Leg Squat',
  'Single Leg Deadlift',
  'Snatch Grip Deadlift',
  'Kettlebell Deadlift',
  'Single Leg RDL',
  'Cossack Squat',
  'Front Squat',
];
const pull = [
  'Pull Up',
  'Crossover Row',
  'Australian Pull Up',
  'Chin Up',
  'Wide Grip Pull Up',
  'Bent Over Row',
];
const push = ['Overhead Press', 'Dip', 'Bench Press', 'Push Up', 'Two Hand Overhead Press'];
const warmup = [
  'Dowel Over Under',
  'Deadlift Pattern',
  'Single Leg Deadlift Pattern',
  'Hip Thruster',
  '90-90',
  'Band Squat',
  'Crossover Warmup',
  'Plank Taps',
  'Reverse Hyper',
  'Side Plank',
  'Ass to Heals',
  'Curl Up',
  'Mule Curl Up',
  'Reverse Hyper',
  'Pallof Press',
  'Carries',
  'Monster Walk',
  'Toes to Bar',
  'Hip Thrusters',
];
const trueOrFalseArray = ['true', 'false'];
const exerciseIntensityArray = ['strength', 'hypertrophy', 'endurance', 'finisher', 'warmup'];
const movement = ['push', 'pull', 'lower body'];
const strengthRepsArray = [5, 6, 7];
const hypertrophyRepsArray = [8, 9, 10];
const enduranceRepsArray = [12, 13, 14];
const repsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// make workouts array of objects

const resistanceTypeArray = [
  'none',
  'lbs',
  'kgs',
  'loop band assistance',
  'loop band resistance',
  'crossover cords',
  'hip bands',
];
const lbsArray = range(0, 500, 5);
const kgsArray = range(0, 300, 4);
// need to figure out assistance or resistance ... going to assume assistance with loops
const loopBandAssistanceArray = ['green', 'purple', 'black', 'red', 0];
const loopBandResistanceArray = [0, 'red', 'black', 'purple', 'green'];
const crossOverCordsArray = ['purple', 'red', 'blue', 'orange'];
const hipBandArray = ['yellow', 'red', 'blue'];

// add exercise intensity - warmup, strength, hypertrophy, endurance, finisher
// movement type - push, pull, lowerbody, coreStability, shoulderStability, shoulderMobility, hipMobility, hipStability, movementPattern

const arraySelect = {
  'push': push,
  'pull': pull,
  'lowerBody': lowerBody,
  warmup: repsArray,
  'finisher': repsArray,
  'coreStability': warmup,
  'hipStability': warmup,
  'shoulderStability': warmup,
  'shoulderMobility': warmup, 
  'movementPattern': warmup,
  'lbs': lbsArray,
  'kgs': kgsArray,
  'loopBandAssistance': loopBandAssistanceArray,
  'loopBandResistance': loopBandResistanceArray,
  'crossoverCords': crossOverCordsArray,
  'hip bands': hipBandArray,
  'strength': strengthRepsArray,
  'hypertrophy': hypertrophyRepsArray,
  'endurance': enduranceRepsArray,
  };
const groupArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const totalSetsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const timeArray = [
  5,
  10,
  15,
  20,
  25,
  30,
  35,
  40,
  45,
  50,
  55,
  60,
  65,
  70,
  75,
  80,
  85,
  90,
  95,
  100,
  105,
  110,
  115,
  120,
];

export {
  groupArray,
  totalSetsArray,
  timeArray,
  lowerBody,
  warmup,
  push,
  pull,
  movement,
  hypertrophyRepsArray,
  strengthRepsArray,
  enduranceRepsArray,
  resistanceTypeArray,
  lbsArray,
  kgsArray,
  loopBandAssistanceArray,
  loopBandResistanceArray,
  crossOverCordsArray,
  hipBandArray,
  arraySelect,
  repsArray,
  exerciseIntensityArray,
  trueOrFalseArray,
};
