const mongoose = require('mongoose');
// const logger = require('../logs');
const User = require('./User');

const { Schema } = mongoose;

// define user Schema
const mongoSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: Date,
    required: true,
    unique: false,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  training: [
    {
      setName: {
        name: String,
        exercises: [
          {
            eid: String,
            name: String,
            // options come from the exercise
            options: [
              {
                progression: String,
              },
            ],
            set: [
              {
                number: Number,
                reps: Array,
                resistance: Array,
              },
            ],
            equipment: String,
            workTime: Number,
            restTime: Number,
            complete: Boolean,
          },
        ],
      },
    },
  ],
});

class WorkoutClass {
  static publicFields() {
    return [];
  }

  static async findEmail({ uid }) {
    try {
      const email = await User.findOne({ _id: uid }).select('email');
      return email;
    } catch (e) {
      console.log(`Workout.js findEmail error -  ${e}`);
      return e;
    }
  }

  static async getNextWorkout({ uid }) {
    console.log('models/workout get next workout called');
    try {
      const nextWorkout = await this.findOne({ uid });
      return nextWorkout;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static async deleteWorkout(_id) {
    let response = 'error';
    try {
      await this.deleteOne({ _id });
      response = 'deleted workout';
      return response;
    } catch (e) {
      return e;
    }
  }

  static async saveWorkout({ name, date, uid, training }) {
    console.log('Workout.saveWorkout');
    console.log(uid);
    try {
      console.log('attempt to save workout');
      const newWorkout = await this.create({ name, date, uid, training });
      console.log('new workout =');
      console.log(newWorkout);
      return newWorkout;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  /*
  static async submitWorkout() {
    return true;
  }

  static async prevWorkouts(_id, uid, length) {
    return true;
  }

  static async prevExercises(workout, uid, length) {
    return true;
  }
  */
}

mongoSchema.loadClass(WorkoutClass);

const Workout = mongoose.model('Workout', mongoSchema);

module.exports = Workout;
