const Progression = require('../../server/models/Progression.js');
import connectToDb from '../../server/middleware/database';


export default async (req, res) => {
  console.log('HIT getAllProgressions');
  await connectToDb();
  try {
    const progressions = await Progression.getAll();
    res.json({
      progressions,
    });
  } catch (err) {
    res.json(e);
  }
}
