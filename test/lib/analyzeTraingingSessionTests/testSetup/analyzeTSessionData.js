import {
  fullWorkout1,
  progressedFullWorkout1,
  partiallyProgressedTrainingSession1,
} from '../../../../server/models/DBFiles/trainingSessions';

export const trainingSession1 = {
  _uid: 'asdflkjasdfkjasdflaksdjf',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 17, 2021 03:24:00'),
  completed: true,
  exercises: fullWorkout1,
};

export const trainingSession2 = {
  _uid: 'asdflkjasdfkjasdflaksdjf1',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 20, 2021 03:24:00'),
  completed: true,
  exercises: fullWorkout1,
};

export const progressedTrainingSession = {
  _uid: 'asdflkjasdfkjasdflaksdjf2',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 21, 2021 03:24:00'),
  completed: true,
  exercises: progressedFullWorkout1,
};

export const partiallyProgressedTrainingSession = {
  _uid: 'asdflkjasdfkjasdflaksdjf3',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 22, 2021 03:24:00'),
  completed: true,
  exercises: partiallyProgressedTrainingSession1,
};
