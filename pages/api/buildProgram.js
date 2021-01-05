import connectToDb from '../../server/middleware/database';

import LocalUser from '../../server/models/LocalUser';
import Program from '../../server/models/Program';

export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  const { newProgram } = req.body;
  console.log('hit buildProgram');
  console.log(newProgram);
  const exercises = newProgram.program;

  console.log('localUser');
  console.log(localUser);
  const workouts = exercises.map((workout) => {
    const workoutArray = {
      date: '',
      completed: false,
      uid: localUser._id,
      exercises: workout,
    };

    return workoutArray;
  });
  console.log('workouts');
  console.log(workouts[0].exercises);

  const program = {
    uid: localUser._id,
    programName: newProgram.programName,
    cycles: newProgram.cycles,
    cycle: 1,
    workoutsCompleted: 0,
    workouts,
  };
  console.log(program);
  try {
    console.log('call create new program');
    const firstProgram = await Program.createProgram(program);
    console.log('firstProgram!');
    console.log(firstProgram);
    res.json({ workouts });
  } catch (e) {
    res.json(e);
  }
};
