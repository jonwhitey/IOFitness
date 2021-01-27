import workouts from './workoutsTry';

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

const movement = ['push', 'pull', 'lower body'];
const strengthRepsArray = [3, 4, 5, 6];
const hypertrophyRepsArray = [7, 8, 9, 10, 11, 12];
const enduranceRepsArray = [13, 14, 15, 16, 17, 18, 19, 20];
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
const lbsArray = Array.from(Array.from(Array(Math.ceil(500 - 0)).keys()), (x) => 0 + x);
const kgsArray = Array.from(Array.from(Array(Math.ceil((200 - 0) / 2)).keys()), (x) => 0 + x * 2);
// need to figure out assistance or resistance ... going to assume assistance with loops
const loopBandAssistanceArray = ['green', 'purple', 'black', 'red', 0];
const loopBandResistanceArray = [0, 'red', 'black', 'purple', 'green'];
const crossOverCordsArray = ['purple', 'red', 'blue', 'orange'];
const hipBandArray = ['yellow', 'red', 'blue'];

// add exercise intensity - warmup, strength, hypertrophy, endurance, finisher
// movement type - push, pull, lowerbody, coreStability, shoulderStability, shoulderMobility, hipMobility, hipStability, movementPattern

const arraySelect = (str, exerciseName) => {
  if (str === 'push') {
    return push;
  }
  if (str === 'pull') {
    return pull;
  }
  if (str === 'lower body') {
    return lowerBody;
  }
  if (str === 'warmup') {
    return repsArray;
  }
  if (str === 'finisher') {
    return repsArray;
  }
  if (
    str === 'coreStability' ||
    str === 'hipStability' ||
    str === 'shoulderStability' ||
    str === 'shoulderMobility' ||
    str === 'movementPattern'
  ) {
    return warmup;
  }
  if (str === 'lbs') {
    return lbsArray;
  }
  if (str === 'kgs') {
    return kgsArray;
  }
  if (str === 'loop band assistance') {
    return loopBandAssistanceArray;
  }
  if (str === 'none') {
    return lbsArray;
  }
  if (str === 'loop band resistance') {
    return loopBandResistanceArray;
  }
  if (str === 'crossover cords') {
    return crossOverCordsArray;
  }
  if (str === 'hip bands') {
    return hipBandArray;
  }
  if (str === 'strength') {
    return strengthRepsArray;
  }
  if (str === 'hypertrophy') {
    return hypertrophyRepsArray;
  }
  if (str === 'endurance') {
    return enduranceRepsArray;
  }
  if (str === null) {
    console.log('null str entered to arraySelect');
    return [0];
  }
  return str;
};
const setArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const setsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
  setArray,
  setsArray,
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
  workouts,
  arraySelect,
  repsArray,
};
