const mongoose = require('mongoose');
const Workout = require('../Workout');

const updateDB = require('../../../lib/updateDB');

const workoutOne = {
  uid: '5f57c1a82d031955d90054f5',
  name: 'Workout One',
  date: new Date(),
  training: [
    {
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],
          equipment: 'None',
          workTime: 30,
          restTime: 30,
          complete: false,
        },
      ],
    },
    {
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],

          equipment: 'Pullup Bar',
          workTime: 20,
          restTime: 30,
          complete: false,
        },
      ],
    },

    {
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],

          equipment: 'None',
          workTime: 30,
          restTime: 30,
          complete: false,
        },
      ],
    },
    {
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],

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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],

          equipment: 'None',
          workTime: 30,
          restTime: 30,
          complete: false,
        },
      ],
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
          sets: [{numReps: 10, resistance: 0}, {numReps: 11, resistance: 0}, {numReps: 11, resistance: 0}],
          equipment: 'Concept 2',
          complete: false,
        },
      ],
    },
  ],
};

console.log('RUNNING WORKOUT ONE');

updateDB(Workout, workoutOne);

/*

Second Try at workout Schema. Made it so the cupletes rendered but not in pairs.
Instead, the rendered as all the sets for exercise 1 then all the sets for exercise 2.

const workoutOne = {
  uid: '5e89272f55d4c037abf3f351',
  name: 'Workout One',
  date: new Date(),
  training: [
    {
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
          sets: [
            {
              set: 1,
              reps: 10,
              resistance: 0,
            },
            {
              set: 2,
              reps: 11,
              resistance: 0,
            },
            {
              set: 3,
              reps: 12,
              resistance: 0,
            },
          ],
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
          sets: [
            {
              set: 1,
              reps: 10,
              resistance: 0,
            },
            {
              set: 2,
              reps: 11,
              resistance: 0,
            },
            {
              set: 3,
              reps: 12,
              resistance: 0,
            },
          ],
          equipment: 'None',
          workTime: 30,
          restTime: 30,
          complete: false,
        },
      ],
    },
    {
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
          sets: [
            {
              set: 1,
              reps: 10,
              resistance: 0,
            },
            {
              set: 2,
              reps: 11,
              resistance: 0,
            },
            {
              set: 3,
              reps: 12,
              resistance: 0,
            },
          ],
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
          sets: [
            {
              set: 1,
              reps: 20,
              units: 'seconds',
              resistance: 0,
            },
            {
              set: 2,
              reps: 20,
              units: 'seconds',

              resistance: 0,
            },
            {
              set: 3,
              reps: 20,
              units: 'seconds',
              resistance: 0,
            },
          ],
          equipment: 'Pullup Bar',
          workTime: 20,
          restTime: 30,
          complete: false,
        },
      ],
    },

    {
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
          sets: [
            {
              set: 1,
              reps: 10,
              resistance: 0,
            },
            {
              set: 2,
              reps: 11,
              resistance: 0,
            },
            {
              set: 3,
              reps: 12,
              resistance: 0,
            },
          ],
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
          sets: [
            {
              set: 1,
              reps: 20,
              units: 'seconds',
              resistance: 0,
            },
            {
              set: 2,
              reps: 20,
              units: 'seconds',
              resistance: 0,
            },
            {
              set: 3,
              reps: 20,
              units: 'seconds',
              resistance: 0,
            },
          ],
          equipment: 'None',
          workTime: 30,
          restTime: 30,
          complete: false,
        },
      ],
    },
    {
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
          sets: [
            {
              set: 1,
              reps: 10,
              units: 'lbs',
              resistance: 15,
            },
            {
              set: 2,
              reps: 11,
              units: 'lbs',
              resistance: 15,
            },
            {
              set: 3,
              reps: 12,
              units: 'lbs',
              resistance: 15,
            },
          ],
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
          sets: [
            {
              set: 1,
              reps: 10,
              units: 'lbs',
              resistance: 15,
            },
            {
              set: 2,
              reps: 11,
              units: 'lbs',
              resistance: 15,
            },
            {
              set: 3,
              reps: 12,
              units: 'lbs',
              resistance: 15,
            },
          ],
          equipment: 'None',
          workTime: 30,
          restTime: 30,
          complete: false,
        },
      ],
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
          sets: [
            {
              set: 1,
              reps: 5000,
              units: 'meters',
              resistance: 10,
            },
          ],
          equipment: 'Concept 2',
          complete: false,
        },
      ],
    },
  ],
};


Original Workout Model with arrays for reps and sets. Made it difficult to iterate over
the reps and resistance arrays to populate the table

{
  'uid': '5e89272f55d4c037abf3f351',
  'name': 'Workout One',
  'date': new Date(),
  'training': [
    {
      'name': 'Warmup',
      'exercises': [
        {
          'eid': '',
          'name': 'Hip Thruster',
          'options': [
            {
              'progression': 'Single Leg',
            },
          ],
          'set': {
            'sets': 3,
            'reps': [10, 11, 12],
            'resistance': [0, '0', '0'],
          },
          'equipment': 'None',
          'workTime': 30,
          'restTime': 30,
          'complete': false,
        },
        {
          'eid': '',
          'name': 'Deadbugs',
          'options': [
            {
              'progression': 'Double Leg',
            },
          ],
          'set': {
            'sets': 3,
            'reps': [10, 11, 12],
            'resistance': ['0', '0', '0'],
          },
          'equipment': 'None',
          'workTime': 30,
          'restTime': 30,
          'complete': false,
        },
      ],
    },
    {
      'name': 'Cuplet One',
      'exercises': [
        {
          'eid': '',
          'name': 'Squat',
          'options': [
            {
              progression: 'TRX',
            },
          ],
          'set': {
            'sets': 3,
            'reps': [10, 10, 10],
            'resistance': ['0', '0', '0'],
          },
          'equipment': 'None',
          'workTime': 30,
          'restTime': 30,
          'complete': false,
        },
        {
          'eid': '',
          'name': 'Pullup',
          'options': [
            {
              'progression': 'Holds',
            },
          ],
          'set': {
            'sets': 3,
            'reps': ['20s', '20s', '20s'],
            'resistance': ['0', '0', '0'],
          },
          'equipment': 'Pullup Bar',
          'workTime': 20,
          'restTime': 30,
          'complete': false,
        },
      ],
    },

    {
      'name': 'Cuplet 2',
      'exercises': [
        {
          'eid': '',
          'name': 'Balance Complex',
          'options': [
            {
              'progression': 'Slider',
            },
          ],
          'set': {
            'sets': 3,
            'reps': [3, 3, 3],
            'resistance': ['0', '0', '0'],
          },
          'equipment': 'Slider',
          'workTime': 60,
          'restTime': 30,
          'complete': false,
        },
        {
          'eid': '',
          'name': 'Dip',
          'options': [
            {
              'progression': 'Top Holds',
            },
          ],
          'set': {
            'sets': 3,
            'reps': ['20s', '20s', '20s'],
            'resistance': ['0', '0', '0'],
          },
          'equipment': 'None',
          'workTime': 30,
          'restTime': 30,
          'complete': false,
        },
      ],
    },
    {
      'name': 'Cuplet 3',
      'exercises': [
        {
          'eid': '',
          'name': 'Overhead Press',
          'options': [
            {
              'progression': 'Full Press',
            },
          ],
          'set': {
            'sets': 3,
            'reps': [10, 11, 12],
            'resistance': [15, 15, 15],
          },
          'equipment': 'Crossover Symetry',
          'workTime': 60,
          'restTime': 30,
          'complete': false,
        },
        {
          'eid': '',
          'name': 'Row',
          'options': [
            {
              'progression': 'Standing Row',
            },
          ],
          'set': {
            'sets': 3,
            'reps': [10, 11, 12],
            'resistance': [15, 15, 15],
          },
          'equipment': 'None',
          'workTime': 30,
          'restTime': 30,
          'complete': false,
        },
      ],
    },
    {
      'name': 'Cardio',
      'exercises': [
        {
          'eid': '',
          'name': 'Rowing Machine',
          'options': [
            {
              'progression': 'Row',
            },
          ],
          'set': {
            sets: 1,
            'reps': [10, 11, 12],
            'distance': '5000m',
            'resistance': 10,
          },
          'equipment': 'Concept 2',
          'complete': false,
        },
      ],
    },
  ],
};

*/
