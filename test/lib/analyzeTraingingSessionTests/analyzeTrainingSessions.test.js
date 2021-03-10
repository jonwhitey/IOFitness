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
const {
  trainingSession1,
  trainingSession2,
  progressedTrainingSession,
  partiallyProgressedTrainingSession,
} = require('./testSetup/analyzeTSessionData');
const {
  squatWarmup,
  unprogressedExercises,
  fullWorkout1,
  progressedFullWorkout1,
  unprogressedLoopBandExercise,
  progressedLoopBandExercise,
} = require('../../../server/models/DBFiles/trainingSessions');

describe('analyzeTrainingSession unit tests', () => {
  // setup
  // trainingSession1
  // trainingSession2
  // progressedTrainingSession
  // exercisesArray
  // progressedExercisesArray

  // test isFirstTrainingSession

  describe('isFirstTrainingSession', () => {
    it('recognizes that only the first session is completed', async () => {
      // set up
      const lastCompletedSession = null;
      // exercise
      const result = isFirstTrainingSession(lastCompletedSession);
      const expectedResult = true;
      // verify
      assert.equal(result, expectedResult);
    });
    it('regcognizes that it is not the first session', async () => {
      // set up
      const lastCompletedSession = trainingSession2;
      const expectedResult = false;
      // exercise
      const result = isFirstTrainingSession(lastCompletedSession);
      // verify
      assert.equal(result, expectedResult);
    });
  });
  describe('repeatSession', () => {
    it('returns the same session without the _id field', async () => {
      // set up
      const completedSession = trainingSession1;
      const expectedResult = completedSession;
      delete completedSession._id;
      // exercise
      const result = repeatSession(completedSession);
      // verify
      assert.deepEqual(result, expectedResult);
    });
  });
  describe('compareTrainingSessions', () => {
    it('returns the entire list of exercises when two sessions are equal', async () => {
      // set up
      const completedSession = trainingSession1;
      const lastCompletedSession = trainingSession2;
      const expectedResult = trainingSession2.exercises;

      // exercise
      const result = compareTrainingSessions(completedSession, lastCompletedSession);
      // verify
      assert.deepEqual(result, expectedResult);
    });
    it('takes a full progressed exercise array and only returns the warmup', async () => {
      // set up
      const completedSession = progressedTrainingSession;
      const lastCompletedSession = trainingSession2;
      const expectedResult = squatWarmup;

      // exercise
      const result = compareTrainingSessions(completedSession, lastCompletedSession);
      // verify
      assert.deepEqual(result, expectedResult);
    });

    // eslint-disable-next-line max-len
    it('takes a partially progressed exercise array and returns exercises that have not been progressed and the warmup', async () => {
      const completedSession = partiallyProgressedTrainingSession;
      const lastCompletedSession = trainingSession2;
      const expectedResult = squatWarmup.concat(unprogressedExercises);

      // exercise
      const result = compareTrainingSessions(completedSession, lastCompletedSession);
      // verify
      assert.deepEqual(result, expectedResult);
    });
  });
  describe('increaseRepsOrResistance', () => {
    it('correctly increases loopband reistance', async () => {
      // set up
      const exercisesToProgress = unprogressedLoopBandExercise;
      const expectedResult = progressedLoopBandExercise;

      // exercise
      const result = increaseRepsOrResistance(exercisesToProgress);
      // verify
      assert.deepEqual(result, expectedResult);
    });
  });

  describe('progressExercises', () => {
    it('correctly progresses a list of exercsises', async () => {
      // set up
      const exercisesToProgress = fullWorkout1;
      const expectedResult = progressedFullWorkout1;

      // exercise
      const result = progressExercises(exercisesToProgress);
      // verify
      assert.deepEqual(result, expectedResult);
    });
  });
});
