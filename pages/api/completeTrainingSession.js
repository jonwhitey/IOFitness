import connectToDb from '../../server/middleware/database';

import LocalUser from '../../server/models/LocalUser';
import TrainingSession from '../../server/models/TrainingSession';
import { analyzeTrainingSessions } from '../../lib/analyzeTrainingSession/analyzeTrainingSessions';
/*
1.  get previous trainingSessions from DB with same name
2.  if no other trainingSessions have the same name -> log complete and repeat the same session
3.  else, compare the previous trainingSessions and use the 2x2 rule to create the next session
*/
export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  const { trainingSession } = req.body;
  console.log('hit completeTrainingSesssion');
  console.log('trainingSession._id');
  console.log(trainingSession._id);
  const trainingSessionId = trainingSession._id;
  // delete the _id for the new trainingSession
  const updatedTrainingSession = trainingSession;
  delete updatedTrainingSession._id;

  try {
    // get previous trainingSession with the same user and name
    const lastCompletedSession = await TrainingSession.getLastCompletedTrainingSessionByName(
      trainingSession.uid,
      trainingSession.trainingSessionName,
    );
    console.log('no lastCompletedSession');
    //console.log(lastCompletedSession);

    const nextTrainingSession = analyzeTrainingSessions(lastCompletedSession, trainingSession);

    // if it's the first training session, log complete and create the same session
    //console.log('trainingSessionId');
    //console.log(trainingSessionId);
    const completeFirstTrainingSession = await TrainingSession.completeTrainingSession(
      trainingSessionId,
      nextTrainingSession,
    );

    // update localUser.nextSession
    const { trainingSessionOrder } = localUser;
    const tSessionOrderLength = trainingSessionOrder.length;
    const tSessionIndex = trainingSessionOrder.indexOf(trainingSession.trainingSessionName);
    let nextSessionIndex = tSessionIndex + 1;

    if (tSessionIndex === tSessionOrderLength - 1) {
      nextSessionIndex = 0;
    }

    const nextSessionName = trainingSessionOrder[nextSessionIndex];
    const updateLocalUserNextSession = await LocalUser.updateNextSession(
      localUser._id,
      nextSessionName,
    );

    res.json({ completeFirstTrainingSession, updateLocalUserNextSession });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
