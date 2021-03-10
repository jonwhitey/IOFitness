/* 
    trims the _id off lastcompletedSession and returns that session 
    need to add another part of this.
*/

export const repeatSession = (completedSession) => {
  // if it's the first completedTraining session, do it again!
  const nextTrainingSession = completedSession;
  delete nextTrainingSession._id;
  return nextTrainingSession;
};
