const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  uid: String,
  date: Date,
  completed: Boolean,
  exercises: [
    {
      exerciseName: String,
      numReps: Number,
      resistance: Schema.Types.Mixed,
      resistanceType: String,
      exerciseType: String,
      exerciseIntensity: String,
      set: Number,
      sets: Number,
      complete: false,
      workTime: Number,
      restTime: Number,
    },
  ],
});

const mongoSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  cycles: {
    type: Number,
    required: true,
    unique: false,
    default: 8,
  },
  currentCycle: {
    type: Number,
    required: true,
    unique: false,
    default: 1,
  },
  programName: {
    type: String,
    required: true,
    unique: false,
  },
  workouts: [workoutSchema],
  workoutsCompleted: Number,
});

class ProgramClass {
  static publicFields() {
    return ['id', 'displayName', 'email', 'isAdmin'];
  }

  static async createProgram(program) {
    try {
      console.log('hit build new program');
      console.log(program);
      console.log(program.workouts[0].exercises[1]);
      const newProgram = await this.create(program);
      console.log('created new program!!!');
      console.log(newProgram.workouts[0]);
      return newProgram;
    } catch (e) {
      console.log('failed to create new program');
      return e;
    }
  }

  static async getProgram(uid) {
    console.log('hit Program getProgram');
    console.log(uid);
    try {
      const program = await this.findOne({ uid });
      console.log(program);
      return program;
    } catch (e) {
      console.log('could not find new program');
      return e;
    }
  }

  // search for a program with a users uid
  // find the next workout in the workouts Array where completed = false
  // return just that workout and the program _id

  static async getNextWorkout(uid) {
    console.log('git getNextWorkout');
    try {
      const nextWorkout = await this.findOne({ uid })
    }
  }
}

mongoSchema.loadClass(ProgramClass);

module.exports = mongoose.models.Program || mongoose.model('Program', mongoSchema);
