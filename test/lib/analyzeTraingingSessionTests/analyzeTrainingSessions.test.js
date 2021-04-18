const { assert } = require('chai');
const {
  progressExercises,
} = require('../../../lib/analyzeTrainingSession/functions/progressExercises');
const {
  increaseRepsOrResistance,
} = require('../../../lib/analyzeTrainingSession/functions/increaseRepsOrResistance');
// const TrainingSession = require('../../../server/models/TrainingSession');
// eslint-disable-next-line max-len
const {
  isFirstTrainingSession,
} = require('../../../lib/analyzeTrainingSession/functions/isFirstTrainingSession');
const { repeatSession } = require('../../../lib/analyzeTrainingSession/functions/repeatSession');

const {
  compareTrainingSessions,
} = require('../../../lib/analyzeTrainingSession/functions/compareTrainingSessions');

const {compileSessionExercises} = require('../../../lib/analyzeTrainingSession/functions/compileSessionExercises');
const {
  trainingSession1,
  trainingSession2,
  progressedTrainingSession,
  partiallyProgressedTrainingSession, 
  completedUnprogressedExercises,
  completedUnprogressedSquatExercises,
  completedUnprogressedLoopBandExercise,
  completedProgressedLoopBandExercise,
  completedSquatWarmup, 
} = require('./testSetup/analyzeTSessionData');

const {completeAllExercises } = require('../../../lib/analyzeTrainingSession/functions/completeAllExercises');
const {squatWarmup, unprogressedSquatExercises, fullSquatExerciseList, progressedSquatExerciseList} = require('../../../server/models/DBFiles/trainingSessions');

describe('analyzeTrainingSession unit tests', () => {
  // setup
  // trainingSession1
  // trainingSession2
  // progressedTrainingSession
  // exercisesArray
  // progressedExercisesArray

  // test isFirstTrainingSession

  describe('isFirstTrainingSession', () => {
    it('recognizes that only the first session is complete', async () => {
      // set up
      const lastCompletedSession = null;
      // exercise
      const actualResult= isFirstTrainingSession(lastCompletedSession);
      const expectedResult = true;
      // verify
      assert.equal(actualResult, expectedResult);
    });
    it('regcognizes that it is not the first session', async () => {
      // set up
      const lastCompletedSession = trainingSession2;
      const expectedResult = false;
      // exercise
      const actualResult= isFirstTrainingSession(lastCompletedSession);
      // verify
      assert.equal(actualResult, expectedResult);
    });
  });
  describe('repeatSession', () => {
    it('returns the same session without the trainingSession or exercises _id field and complete: false', async () => {
      // set up
      const completedSession = trainingSession1;
      const expectedResultExercises = trainingSession1.exercises.map(e => ({...e, complete: false}));
      const expectedResult = completedSession;
      expectedResult.exercises = expectedResultExercises
      delete completedSession._id;
      // exercise
      const actualResult= repeatSession(completedSession);
      
      // verify
      assert.deepEqual(actualResult, expectedResult);
    });
  });
  describe('compareTrainingSessions', () => {
    it('returns the entire list of exercises when two sessions are equal', async () => {
      // set up
      console.log('setup');
      const completedSession = completeAllExercises(trainingSession1, 'trainingSession');
      const lastCompletedSession = completeAllExercises(trainingSession2, 'trainingSession');
      const expectedResult = lastCompletedSession.exercises;

      // exercise
      const actualResult= compareTrainingSessions(lastCompletedSession, completedSession);
      console.log('compareTrainingSessions1');
      console.log(completedSession.exercises[8]);
      console.log(lastCompletedSession.exercises[8]);
      //console.log(actualResult);
      // verify
      assert.deepEqual(actualResult, expectedResult);
    });
    it('takes a full progressed exercise array and only returns the warmup', async () => {
      // set up

      const completedSession = completeAllExercises(progressedTrainingSession, 'trainingSession');
      const lastCompletedSession = completeAllExercises(trainingSession2, 'trainingSession');
      const expectedResult = completedSquatWarmup;
      console.log('expectedREsult1');
      console.log(expectedResult[1]);

      // exercise
      const actualResult= compareTrainingSessions(completedSession, lastCompletedSession);
      // verify
      assert.deepEqual(actualResult, expectedResult);
    });

    // eslint-disable-next-line max-len
    it('takes a partially progressed exercise array and returns exercises that have not been progressed and the warmup', async () => {
      const completedSession = completeAllExercises(partiallyProgressedTrainingSession, 'trainingSession');
      const lastCompletedSession = completeAllExercises(trainingSession2, 'trainingSession');
      const expectedResult = completedUnprogressedSquatExercises;

      // exercise
      const actualResult= compareTrainingSessions(completedSession, lastCompletedSession);
      console.log('compareTrainingSessions');
      console.log(actualResult.length);
      // verify
      assert.deepEqual(actualResult, expectedResult);
    });
  });
  describe('increaseRepsOrResistance', () => {
    it('correctly increases loopband reistance', async () => {
      // set up
      const exercisesToProgress = completedUnprogressedLoopBandExercise;
      const expectedResult = completedProgressedLoopBandExercise;
      // exercise
      const actualResult= increaseRepsOrResistance(exercisesToProgress);
      // verify
      assert.deepEqual(actualResult, expectedResult);
    });
  });

  describe('progressExercises', () => {
    it('correctly progresses a list of exercsises', async () => {
      // set up
      const exercisesToProgress = fullSquatExerciseList;
      const expectedResult = progressedSquatExerciseList;

      // exercise
      const actualResult= progressExercises(exercisesToProgress);
      // verify
      assert.deepEqual(actualResult, expectedResult);
    });
  });

  describe('compileSessionExercises', () => {
    it('returns the same traingingSession with complete: false', async () => {
      // fullworkout
      // warmup
      const nextSession = completeAllExercises(trainingSession1, 'trainingSession');

      let fullWorkoutExercises = trainingSession2.exercises.map(v =>( {...v, complete: false, }));
      const warmup = squatWarmup;
      // print the full workout
      console.log('compilesed');
      console.log(fullWorkoutExercises[8]);
      const expecetedResult = fullWorkoutExercises;

      const actualResult= compileSessionExercises(nextSession, warmup);
      console.log('EXERCISE 8');
      console.log(nextSession.exercises[8]);
      console.log(actualResult[8]);
      console.log(expecetedResult[8]);

      assert.deepEqual(actualResult, expecetedResult);
    })
  })
});
