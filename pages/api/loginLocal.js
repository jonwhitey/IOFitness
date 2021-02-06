import connectToDb from '../../server/middleware/database';

import LocalUser from '../../server/models/LocalUser';

export default async (req, res) => {
  await connectToDb();
  const { user } = req.body;
  // console.log('loginLocal');
  // console.log(user);
  try {
    const localUser = await LocalUser.loginLocal({ user });
    if (localUser) {
      console.log(localUser);
      res.json({ localUser });
    }
  } catch (e) {
    res.json(e);
  }
};
