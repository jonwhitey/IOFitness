export const workoutOne = {
  uid: '5e89272f55d4c037abf3f351',
  name: 'Workout One',
  date: new Date(),
  training: [
    {
      setName: {
        name: 'Warmup',
        exercises: [
          {
            eid: '',
            name: 'Hip Thruster',
            options: [
              {
                progression: 'Single Leg',
              },
            ],
            set: {
              sets: 3,
              reps: [10, 11, 12],
              resistance: ['bodyweight', 'bodyweight', 'bodyweight'],
            },
            equipment: 'None',
            workTime: 30,
            restTime: 30,
            complete: false,
          },
          {
            eid: '',
            name: 'Deadbugs',
            options: [
              {
                progression: 'Double Leg',
              },
            ],
            set: {
              sets: 3,
              reps: [10, 11, 12],
              resistance: ['bodyweight', 'bodyweight', 'bodyweight'],
            },
            equipment: 'None',
            workTime: 30,
            restTime: 30,
            complete: false,
          },
        ],
      },
    },
    {
      setName: {
        name: 'Cuplet One',
        exercises: [
          {
            eid: '',
            name: 'Squat',
            options: [
              {
                progression: 'TRX',
              },
            ],
            set: {
              sets: 3,
              reps: [10, 10, 10],
              resistance: ['bodyweight', 'bodyweight', 'bodyweight'],
            },
            equipment: 'None',
            workTime: 30,
            restTime: 30,
            complete: false,
          },
          {
            eid: '',
            name: 'Pullup',
            options: [
              {
                progression: 'Holds',
              },
            ],
            set: {
              sets: 3,
              reps: ['20s', '20s', '20s'],
              resistance: ['bodyweight', 'bodyweight', 'bodyweight'],
            },
            equipment: 'Pullup Bar',
            workTime: 20,
            restTime: 30,
            complete: false,
          },
        ],
      },
    },
    {
      setName: {
        name: 'Cuplet 2',
        exercises: [
          {
            eid: '',
            name: 'Balance Complex',
            options: [
              {
                progression: 'Slider',
              },
            ],
            set: {
              sets: 3,
              reps: [3, 3, 3],
              resistance: ['bodyweight', 'bodyweight', 'bodyweight'],
            },
            equipment: 'Slider',
            workTime: 60,
            restTime: 30,
            complete: false,
          },
          {
            eid: '',
            name: 'Dip',
            options: [
              {
                progression: 'Top Holds',
              },
            ],
            set: {
              sets: 3,
              reps: ['20s', '20s', '20s'],
              resistance: ['bodyweight', 'bodyweight', 'bodyweight'],
            },
            equipment: 'None',
            workTime: 30,
            restTime: 30,
            complete: false,
          },
        ],
      },
    },
    {
      setName: {
        name: 'Cuplet 3',
        exercises: [
          {
            eid: '',
            name: 'Overhead Press',
            options: [
              {
                progression: 'Full Press',
              },
            ],
            set: {
              sets: 3,
              reps: [10, 11, 12],
              resistance: [15, 15, 15],
            },
            equipment: 'Crossover Symetry',
            workTime: 60,
            restTime: 30,
            complete: false,
          },
          {
            eid: '',
            name: 'Row',
            options: [
              {
                progression: 'Standing Row',
              },
            ],
            set: {
              sets: 3,
              reps: [10, 11, 12],
              resistance: [15, 15, 15],
            },
            equipment: 'None',
            workTime: 30,
            restTime: 30,
            complete: false,
          },
        ],
      },
    },
    {
      name: 'Cardio',
      exercises: [
        {
          eid: '',
          name: 'Rowing Machine',
          options: [
            {
              progression: 'Row',
            },
          ],
          set: {
            sets: 1,
            reps: [10, 11, 12],
            distance: '5000m',
            resistance: 10,
          },
          equipment: 'Concept 2',
          complete: false,
        },
      ],
    },
  ],
};
