import connectToDb from '../../server/middleware/database';
import TrainingSession from '../../server/models/TrainingSession';

// gets a localUsers nextSession from the TrainingSession collection

export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  console.log('hit getTrainingSesssion');

  try {
    console.log('call getTrainingSession');
    console.log(localUser._id);
    const trainingSession = await TrainingSession.getTrainingSession(
      localUser._id,
      localUser.nextSession,
    );
    
    console.log('getTrainingSession!');
    res.json({ trainingSession });
  } catch (e) {
    res.json(e);
  }
};
