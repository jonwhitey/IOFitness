const mongoose = require('mongoose');

const { Schema } = mongoose;

// group: what other exercises are you grouped with
// totalSets: total sets to complete
// setsCompleted

const mongoSchema = new Schema({
  uid: String,
  trainingSessionName: String,
  date: Date,
  complete: Boolean,
  exercises: [
    {
      _id: false,
      exerciseName: String,
      exerciseNumber: Number,
      groupNumber: Number,
      totalSets: Number,
      numReps: Number,
      resistance: Schema.Types.Mixed,
      resistanceType: String,
      exerciseIntensity: String,
      workTime: Number,
      restTime: Number,
      complete: { type: Boolean, default: false },
    },
  ],
});

class TrainingSessionClass {
  static publicFields() {
    return ['uid'];
  }

  static async createTrainingSession(trainingSession) {
    try {
      console.log('hit build new program');
      console.log(trainingSession.exercises[0]);
      const newTrainingSession = await this.create(trainingSession);
      console.log('created new program!!!');
      console.log(newTrainingSession.exercises[0]);
      return newTrainingSession;
    } catch (e) {
      console.log('failed to create new program');
      return e;
    }
  }

  static async createMultipleTrainingSessions(trainingSessions) {
    try {
      console.log('hit createMultipleTrainingSesssions');
      console.log(trainingSessions[0].exercises[5]);
      const result = await this.insertMany(trainingSessions, { ordered: true });
      console.log(result[0].exercises[5]);
      return result;
    } catch (e) {
      console.log('error in createMultipleTrainingSessions');
      return e;
    }
  }

  static async getTrainingSession(uid, trainingSessionName) {
    console.log('TrainingSession.getTrainingSession')
    console.log(uid);
    console.log(trainingSessionName);
    try {
      const trainingSession = await this.findOne({ uid, trainingSessionName, 'complete': false }, ).sort({'date': -1}).lean();
      return trainingSession;
    } catch (e) {
      console.log(e);
      console.log('could not find trainingSession');
      return e;
    }
  }

  static async getLastCompletedTrainingSessionByName(uid, trainingSessionName) {
    try {
      const lastTrainingSession = await this.findOne({
        uid,
        trainingSessionName,
        complete: true,
      })
        .sort({ date: -1 })
        .lean();
      return lastTrainingSession;
    } catch (e) {
      console.log('could not getTrainingSessionsByName');
      return e;
    }
  }

  static async completeTrainingSession(completedSessionId, completedSession, nextSession) {
    // find and update the previous session
    console.log('TrainingSession.completeTrainingSession');
    
    try {
      const trainingSession = await this.findOne({_id: completedSessionId});
      console.log('found training session');
      trainingSession.exercises = completedSession.exercises;
      trainingSession.complete = completedSession.complete;
      trainingSession.date = Date.now();

      await trainingSession.save();
      nextSession.complete = false;
      const createNextSession = await this.create(nextSession);

      return createNextSession;

      /*
      const sessionComplete = await this.findOneAndUpdate(
        { _id: completedSessionId },
        { exercises: completedSession.exercises, complete: completedSession.complete, date: Date.now() },
      );
      // console.log(sessionComplete);
      console.log(nextSession.exercises[8]);
      console.log(nextSession.complete);
      const createNextSession = await this.create(nextSession);
      return [sessionComplete, createNextSession];
      */
      // create the next session
    } catch (e) {
      console.log('could not completeTrainingSession');
      console.log(e);
      return e;
    }
  }

  // search for a program with a users uid
  // find the next trainingSession in the workouts Array where complete = false
  // return just that trainingSession and the program _id
}

mongoSchema.loadClass(TrainingSessionClass);

module.exports = mongoose.models.TrainingSession || mongoose.model('TrainingSession', mongoSchema);
