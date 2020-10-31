import connectToDb from '../../server/middleware/database';

import LocalUser from '../../server/models/LocalUser';
import Program from '../../server/models/Program';

export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  console.log('hit getProgram');
  // console.log(newProgram);

  try {
    console.log('call get program');
    console.log(localUser._id);
    const program = await Program.getProgram(localUser._id);
    console.log('Program!');
    res.json({ program });
  } catch (e) {
    res.json(e);
  }
};
