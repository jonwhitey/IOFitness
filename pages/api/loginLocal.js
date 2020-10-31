import connectToDb from '../../server/middleware/database';

import LocalUser from '../../server/models/LocalUser';
import Workout from '../../server/models/Workout';

export default async (req, res) => {
  await connectToDb();
  const { user } = req.body;
  // console.log('loginLocal');
  // console.log(user);
  try {
    const localUser = await LocalUser.loginLocal({ user });
    if (localUser) {
      console.log('doc');
      console.log(localUser);
      //const workout = await Workout.getNextWorkout({ uid: localUser._id });

      //console.log(workout);
      res.json({ localUser });
    }
  } catch (e) {
    res.json(e);
  }
};
