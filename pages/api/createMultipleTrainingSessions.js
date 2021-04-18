import connectToDb from '../../server/middleware/database';
import TrainingSession from '../../server/models/TrainingSession';
import LocalUser from '../../server/models/LocalUser';
/*
1. creates the sessionOrder array and nextSession and saves it to the localUser document 
2. takes the trainingSessionsArray and transforms it into the correct shape
3. saves multiple training sessions to the trainingSessions collection
*/

export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  const { newTrainingSessions } = req.body;
  const trainingSessionsArray = newTrainingSessions.newTrainingSessions;

  console.log('hit createMultipleSessions');

  // takes the trainingSessionName from each object and creates an array
  // saved as the localUser.trainingSessionOrder
  const trainingSessionNameArray = trainingSessionsArray.map(
    ({ trainingSessionName }) => trainingSessionName,
  );

  /*
  trainingSessionsArray = [
    {
      trainingSessionName: 'Session 1'
      '0': [Object],
      '1': [Object],
      '2': [Object],
      ...
    },
    {
      trainingSessionName: 'Session 2'
      '0': [Object],
      '1': [Object],
      '2': [Object],
      ...
    }
  ] 
  newTrainingSessionsToSave is an array of TrainingSessions
  */
  const newTrainingSessionsToSave = trainingSessionsArray.map((trainingSession) => {
    // creates the exercisesArray
    const exercisesArray = [];

    Object.keys(trainingSession).forEach((key) => {
      if (key !== 'trainingSessionName') {
        exercisesArray.push(trainingSession[key]);
      }
    });
    // adds the exerciseNumber and turn numReps into an array
    const addExerciseNumber = (array) => {
      const newArray = array.map((exerciseObject, index) => ({
        ...exerciseObject,
        //numReps: new Array(exerciseObject.sets).fill(exerciseObject.numReps),
        exerciseNumber: index + 1,
      }));
      return newArray;
    };
    // creates the final object
    const trainingSessionObject = {
      uid: localUser._id,
      date: '',
      complete: false,
      trainingSessionName: trainingSession.trainingSessionName,
      exercises: addExerciseNumber(exercisesArray),
    };
    return trainingSessionObject;
  });
  // inserts trainingSessions into TrainingSession collection
  // updates the trainingSession Order for the localUser
  try {
    console.log('call createMultipleTrainingSessions');
    console.log(trainingSessionNameArray);
    const response = await TrainingSession.createMultipleTrainingSessions(
      newTrainingSessionsToSave,
    );
    const updateUserSessionOrder = await LocalUser.updateTrainingSessionOrder(
      localUser._id,
      trainingSessionNameArray,
    );
    res.json(response, updateUserSessionOrder);
  } catch (e) {
    res.json(e);
  }
};
