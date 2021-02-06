import connectToDb from '../../server/middleware/database';

import LocalUser from '../../server/models/LocalUser';
import TrainingSession from '../../server/models/TrainingSession';

export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  console.log('hit getTrainingSesssion');

  try {
    console.log('call get program');
    console.log(localUser._id);
    const trainingSession = await TrainingSession.getTrainingSession(localUser._id);
    console.log('trainingSession!');
    res.json({ trainingSession });
  } catch (e) {
    res.json(e);
  }
};
