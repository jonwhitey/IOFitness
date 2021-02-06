const mongoose = require('mongoose');

const { Schema } = mongoose;

// group: what other exercises are you grouped with
// totalSets: total sets to complete
// setsCompleted

const mongoSchema = new Schema({
  uid: String,
  sessionName: String,
  date: Date,
  completed: Boolean,
  exercises: [
    {
      exerciseName: String,
      exerciseNumber: Number,
      groupNumber: Number,
      totalSets: Number,
      setsCompleted: { type: Number, default: 0 },
      numReps: Array,
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

  static async getTrainingSession(uid) {
    try {
      const trainingSession = await this.findOne({ uid });
      return trainingSession;
    } catch (e) {
      console.log('could not find new program');
      return e;
    }
  }

  // search for a program with a users uid
  // find the next trainingSession in the workouts Array where completed = false
  // return just that trainingSession and the program _id
}

mongoSchema.loadClass(TrainingSessionClass);

module.exports = mongoose.models.TrainingSession || mongoose.model('TrainingSession', mongoSchema);
