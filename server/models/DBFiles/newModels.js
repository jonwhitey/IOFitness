/* 
user is related to a program
    -- one to few (5-10 per year)
    -- one active program at a time

a program is a template that creates series of workouts 
   a program will create workouts 1.1, 2.1, 3.1
   a user will access workout 1 and complete it
   workout 1 will  be saved to the DB, then
   workout 1.2 will be created with increased or decreased difficulty
   after the user complete workouts 2.1 and 3.1
   they will complete workout 1.2
   program to workouts
    -- one to ~50-100


a workout is a series of exercises
 workouts to exercise
    -- one to ~25-100

exercises have the keys:
- exerciseName: name of the exercise
- group: the order in which the exercises are performed,
- sets: the number of times, the number of reptitions will be performed
- repetitions: the number of repetitions that will be performed per set 
- resistanceType: pounds, kgs, band color...
- resistance: the amount of the resistance type
- workTime: the amount of time alotted to complete a set
- restTime: the amount of time between sets

> all of the sets in group 1 are performed before group 2
    > a group can include multiple exercises (usually 2-3)
    > ex: squats and push ups for three sets of ten repetitions 
        > a user performs 10 squats then 10 pushups 3 times to complete group 1

> resistance and repetitions can be variable over each set

each exercise is performed in multiple times, each time a user performs an exercise they complete a set

when all the exercises of all the sets in all the groups are complete, the user has complete the workout

the workout will then be saved as complete, and the next workout will be generated with user input
    the user will input weather or not to increase repetitions or resistance in their next workout

a user can have 3-12 workouts that repeat 6-8 times over the course of a program cycles
    -- workout1.1
    -- workout2.1
    -- workout3.1
    -- workout1.2
    -- workout 2.2
    -- workout 3.2
    -- workout 1.3
    ...


    workout1.1 and workout1.2 will have completely different exercises

    workout1.1 and workout1.2 have the same exercises but different resistances or different repetition counts

    how do I model the programs to create the workouts

    how do I model the exercises within the workouts?
    


// there's two questions,
// do you separate workouts from programs? -- I think yes
// do you separate an set into it's own object?

// data access patterns

program creation

    1. the user selects a basics program or selects specific exercises they want to incorporate into their program
    2. the user selects how many cycles they want to include in the program
    3. the program generator creates the first cycle of workouts based on the users picks
    4. the program document monitors the current_workout_id, current_cycle, workout_names, workout_ids




// user to workouts 
    == one 100's


// Program should have a user
  a constrcutor
    - User want to work on these areas
      - Squat progression
    - App looks up user to figure out where they are at and creates a new workout

/* program document

    uid
    date_started
    cycles
    cycles_completed
    program_completed
    workout_names
    exercise_names
    current_workout_id


/* workout documents
    workout_id
    uid
    work_name
    program_id
    cycle_number
    workout_completed
    exerciseGroups: [
        [exercise1, exercise2],
        [exercise3, exercise4]
    ]
    OR
    exercises:[
        exercise1.1, exercise2.1, exercise1.2, exercise2.2, exercise1.3, exercise2.3, exercise3.1, exercise4.1...
    ]
/ during a workout, the app will loop over each exercise in a exercise group

/ when a user completes the workout, the app will analyze the workout compared to the past workouts,
/ the app will increase resistance or reps based on past workout completion and place in the cycle 
/ alternatively, workout completion could trigger a form that asks the user if they want to increase reps or resistance 

/ then a new workout is created and added to the db
/ the current_workout_id and the cycle_number will be updated on the program document



// query for a specific workout within a program
// loop over each set of each exercise group during the workout, marking each set as complete
// mark the entire, or part of the workout as complete and save it to the db
// based on the program parameters create a new workout 
 
*/

const workoutSchema = new Schema({
  uid: String,
  program_id: String,
  date: Date,
  complete: Boolean,
  exerciseGroups: [
    [
      {
        exerciseName: String,
        numReps: Number,
        resistance: Schema.Types.Mixed,
        resistanceType: String,
        exerciseType: String,
        exerciseIntensity: String,
        sets: Number,
        complete: false,
        workTime: Number,
        restTime: Number,
      },
    ],
  ],
});

const mongoSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  cycles: {
    type: Number,
    required: true,
    unique: false,
    default: 8,
  },
  currentCycle: {
    type: Number,
    required: true,
    unique: false,
    default: 1,
  },
  programName: {
    type: String,
    required: true,
    unique: false,
  },
  workouts: [workoutSchema],
  workoutsCompleted: Number,
});
