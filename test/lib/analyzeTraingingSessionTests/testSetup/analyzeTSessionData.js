import {
  fullSquatExerciseList,
  progressedSquatExerciseList,
  partiallyProgressedSquatExercises,
  squatWarmup,
  unprogressedLoopBandExercise,
  progressedLoopBandExercise,
  unprogressedCoreSquatExercises,
  unprogressedSquatExercises
} from '../../../../server/models/DBFiles/trainingSessions';
import {completeAllExercises } from '../../../../lib/analyzeTrainingSession/functions/completeAllExercises';


export const trainingSession1 = {
  _uid: 'asdflkjasdfkjasdflaksdjf',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 17, 2021 03:24:00'),
  complete: true,
  exercises: fullSquatExerciseList,
};

export const trainingSession2 = {
  _uid: 'asdflkjasdfkjasdflaksdjf1',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 20, 2021 03:24:00'),
  complete: true,
  exercises: fullSquatExerciseList,
};

export const progressedTrainingSession = {
  _uid: 'asdflkjasdfkjasdflaksdjf2',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 21, 2021 03:24:00'),
  complete: true,
  exercises: progressedSquatExerciseList,
};

export const partiallyProgressedTrainingSession = {
  _uid: 'asdflkjasdfkjasdflaksdjf3',
  trainingSessionName: 'Test Session 1',
  date: new Date('December 22, 2021 03:24:00'),
  complete: true,
  exercises: partiallyProgressedSquatExercises,
};
console.log('session data');
console.log(typeof(squatWarmup));
export const completedSquatWarmup = completeAllExercises(squatWarmup, 'exercises');
export const completedUnprogressedExercises = completeAllExercises(fullSquatExerciseList, 'exercises');
export const completedUnprogressedLoopBandExercise = completeAllExercises(unprogressedLoopBandExercise, 'exercise');
export const completedProgressedLoopBandExercise = completeAllExercises(progressedLoopBandExercise, 'exercise');  
export const completedPartiallyProgressedExercises = completeAllExercises(partiallyProgressedSquatExercises, 'exercises');
export const completedUnprogressedSquatExercises = completeAllExercises(unprogressedSquatExercises, 'exercises');