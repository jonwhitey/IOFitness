import connectToDb from '../../server/middleware/database';
import TrainingSession from '../../server/models/TrainingSession';

export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  const { newTrainingSessions } = req.body;
  const trainingSessionsArray = newTrainingSessions.newTrainingSessions;
  console.log('hit createMultipleSessions');
  console.log(newTrainingSessions);
  console.log('localUser');
  console.log(localUser);
  const newTrainingSessionsToSave = trainingSessionsArray.map((trainingSession) => {
    const exercisesArray = [];

    Object.keys(trainingSession).forEach((key) => {
      if (key !== 'trainingSessionName') {
        exercisesArray.push(trainingSession[key]);
      }
    });

    const addExerciseNumber = (array) => {
      const newArray = array.map((exerciseObject, index) => ({
        ...exerciseObject,
        exerciseNumber: index + 1,
      }));
      console.log('addExerciseNumber');
      console.log(newArray[1]);
      return newArray;
    };
    const trainingSessionObject = {
      uid: localUser._id,
      date: '',
      completed: false,
      trainingSessionName: trainingSession.trainingSessionName,
      exercises: addExerciseNumber(exercisesArray),
    };
    return trainingSessionObject;
  });
  console.log(newTrainingSessionsToSave);
  try {
    console.log('call createMultipleTrainingSessions');
    const response = await TrainingSession.createMultipleTrainingSessions(
      newTrainingSessionsToSave,
    );
    res.json(response);
  } catch (e) {
    res.json(e);
  }
};

// i have an object that is an array of objects
// array of objects
// destructure the object and remove top level keys
