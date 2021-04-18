/* 
    trims the _id off lastcompletedSession and returns that session 
    need to add another part of this.
*/

export const repeatSession = (nextSession) => {
  // if it's the first completedTraining session, do it again!
  delete nextSession._id;
  nextSession.exercises = nextSession.exercises.map(e => ({...e, complete: false,}));
  return nextSession;
};
