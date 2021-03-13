import { loginLocal, getTrainingSession } from '../api/customer';

export const callLoginLocal = async (user) => {
  console.log('callLoginLocal')
  console.log(user);
    try {
        const { localUser } = await loginLocal({ user });
        console.log('localUser');
        console.log(localUser);
        const { trainingSession } = await getTrainingSession({ localUser });
    
        if (!localUser) {
          console.log('localLogin failed');
          // eslint-disable-next-line consistent-return
          return 'no localUser found';
        }
        if (!trainingSession) {
          console.log('no trainingSession found');
          // eslint-disable-next-line consistent-return
          return 'no trainingSessionFound'
          };
        return (localUser, trainingSession);
      } catch (e) {
          return e;
      };
    
}