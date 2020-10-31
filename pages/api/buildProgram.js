import connectToDb from '../../server/middleware/database';

import LocalUser from '../../server/models/LocalUser';
import Program from '../../server/models/Program';

export default async (req, res) => {
  await connectToDb();
  const { localUser } = req.body;
  const { newProgram } = req.body;
  console.log('hit buildProgram');
  // console.log(newProgram);
  const exercises = newProgram.program;
  const strengthReps = 5;
  const hypertrophyReps = 7;
  const enduranceReps = 12;
  console.log('localUser');
  console.log(localUser);
  const workouts = exercises.map((workout) => {
    const workoutArray = {
      date: '',
      completed: false,
      uid: localUser._id,
      exercises: [
        {
          exercise: workout.strength[1],
          numReps: strengthReps,
          resistance: 1,
          intensity: 'Strength',
          set: 1,
          sets: 3,
          exerciseCompleted: false,
        },
        {
          exercise: workout.hypertrophy[1],
          numReps: hypertrophyReps,
          resistance: 1,
          intensity: 'Hypertrophy',
          set: 1,
          sets: 3,
          exerciseCompleted: false,
        },
        {
          exercise: workout.strength[2],
          numReps: strengthReps,
          resistance: 1,
          intensity: 'Strength',
          set: 2,
          sets: 3,
          exerciseCompleted: false,
        },
        {
          exercise: workout.endurance[1],
          numReps: enduranceReps,
          resistance: 1,
          intensity: 'Endurance',
          set: 2,
          sets: 3,
          exerciseCompleted: false,
        },
        {
          exercise: workout.hypertrophy[2],
          numReps: hypertrophyReps,
          resistance: 1,
          intensity: 'Hypertrophy',
          set: 3,
          sets: 3,
          exerciseCompleted: false,
        },
        {
          exercise: workout.endurance[2],
          numReps: enduranceReps,
          resistance: 1,
          intensity: 'Endurance',
          set: 3,
          sets: 3,
          exerciseCompleted: false,
        },
      ],
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
