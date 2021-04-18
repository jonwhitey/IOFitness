/*
takes the lastCompletedSession and completedSession
checks to see that lastCompletedSession exists,
if it doesn't exist, it is the first trainingSession complete 
isFirstTrainingSession removes the _id and returns the rest of the traingingSession objeect
else, return the completedSession  
*/

export const isFirstTrainingSession = (lastCompletedSession) => {
  if (!lastCompletedSession) {
    // if it's the first completedTraining session, do it again!
    return true;
  }
  return false;
};
