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
  const { liveTrainingSession } = req.body;
  console.log('hit completeTrainingSesssion');
  console.log(req.body);
  
  const liveTrainingSessionId = liveTrainingSession._id;
  // delete the _id for the new trainingSession
  

  try {
    // get previous trainingSession with the same user and name
    const lastCompletedSession = await TrainingSession.getLastCompletedTrainingSessionByName(
      liveTrainingSession.uid,
      liveTrainingSession.trainingSessionName,
    );
    console.log('liveTrainingSession.exercises.complete');
    console.log(liveTrainingSession.exercises[6].complete);
    //console.log(lastCompletedSession);

    const nextTrainingSession = analyzeTrainingSessions(lastCompletedSession, liveTrainingSession);
    console.log('liveTrainingSession.exercises.complete');
    console.log(liveTrainingSession.exercises[6].complete);

    const completeTrainingSession = await TrainingSession.completeTrainingSession(
      liveTrainingSessionId,
      liveTrainingSession,
      nextTrainingSession,
    );

    // update localUser.nextSession
    const { trainingSessionOrder } = localUser;
    const tSessionOrderLength = trainingSessionOrder.length;
    const tSessionIndex = trainingSessionOrder.indexOf(liveTrainingSession.trainingSessionName);
    let nextSessionIndex = tSessionIndex + 1;

    if (tSessionIndex === tSessionOrderLength - 1) {
      nextSessionIndex = 0;
    }

    const nextSessionName = trainingSessionOrder[nextSessionIndex];
    const updateLocalUserNextSession = await LocalUser.updateNextSession(
      localUser._id,
      nextSessionName,
    );

    res.json({ completeTrainingSession, updateLocalUserNextSession });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
