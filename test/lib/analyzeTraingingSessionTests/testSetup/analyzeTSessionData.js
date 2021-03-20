import {
  fullWorkout1,
  progressedFullWorkout1,
  partiallyProgressedTrainingSession1,
  squatWarmup,
  unprogressedExercises,
  unprogressedLoopBandExercise,
  progressedLoopBandExercise,
} from '../../../../server/models/DBFiles/trainingSessions';


export const fullWorkoutWithIds = fullWorkout1.map(v =>( {...v, _id: '604e1866cae1f0746ad72c60',}));
export const progressedFullWorkoutWithIds = progressedFullWorkout1.map(v => ({...v, _id: '604e1866cae1f0746ad72c60',}));
export const partiallyProgressedExercisesWithIds = partiallyProgressedTrainingSession1.map(v => ({...v, _id: '604e1866cae1f0746ad72c60',}));
export const squatWarmupWithIds = squatWarmup.map(v => ({...v, _id: '604e1866cae1f0746ad72c60',}));
export const unprogressedExercisesWithIds = unprogressedExercises.map(v => ({...v, _id: '604e1866cae1f0746ad72c60',}));
export const unprogressedLoopBandExerciseWithId = {...unprogressedLoopBandExercise, _id: '604e1866cae1f0746ad72c60'};
export const progressedLoopBandExerciseWithId = {...progressedLoopBandExercise, _id: '604e1866cae1f0746ad72c60'};

export const trainingSession1 = {
  _uid: 'asdflkjasdfkjasdflaksdjf',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 17, 2021 03:24:00'),
  completed: true,
  exercises: fullWorkoutWithIds,
};

export const trainingSession2 = {
  _uid: 'asdflkjasdfkjasdflaksdjf1',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 20, 2021 03:24:00'),
  completed: true,
  exercises: fullWorkoutWithIds,
};

export const progressedTrainingSession = {
  _uid: 'asdflkjasdfkjasdflaksdjf2',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 21, 2021 03:24:00'),
  completed: true,
  exercises: progressedFullWorkoutWithIds,
};

export const partiallyProgressedTrainingSession = {
  _uid: 'asdflkjasdfkjasdflaksdjf3',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 22, 2021 03:24:00'),
  completed: true,
  exercises: partiallyProgressedExercisesWithIds,
};
