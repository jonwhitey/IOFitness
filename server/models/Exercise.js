const mongoose = require('mongoose');

const { Schema } = mongoose;

// define user Schema
const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  uniOrBi: String,
  strengthType: String,
  mobilityType: String,
  level: Number,
  spinalCompression: Boolean,
  spinalRotation: Boolean,
  equipment: Array,
});

class ExerciseClass {
  static async findExercise({ name }) {
    try {
      console.log("FINDEXERCISE");
      const exercise = await this.findOne({ name });
      return exercise;
    } catch (e) {
      console.log(`Exercise.js findExercise error -  ${e}`);
      return e;
    }
  }

  static async deleteExercise(name) {
    let response;
    try {
      await this.deleteOne({ name });
      response = 'deleted exrecise';
      return response;
    } catch (e) {
      return e;
    }
  }
}

mongoSchema.loadClass(ExerciseClass);

const Exercise = mongoose.model('Exercise', mongoSchema);


module.exports = Exercise;