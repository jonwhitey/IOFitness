import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { blue } from '@material-ui/core/colors';
import { loginLocal, getProgram } from '../lib/api/customer';
import Layout from '../components/layout';
import auth0 from '../lib/auth0';

// import Workout from '../components/Workout';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  1: {
    backgroundColor: '#011f4b',
    color: 'white',
  },
  2: {
    backgroundColor: '#03396c',
    color: 'white',
  },
  3: {
    backgroundColor: '#005b96',
    color: 'white',
  },
  4: {
    backgroundColor: '#6497b1',
    color: 'white',
  },
  currentSetStyle: {
    backgroundColor: '#02C769',
  },
  tCell: {
    color: 'white',
  },
}));

function Workout({ user, program }) {
  const classes = useStyles();
  const loading = false;

  const [currentSet, setCurrentSet] = useState(0);

  const currentWorkout = program.workouts.find((nextWorkout) => nextWorkout.completed === false);
  console.log(currentWorkout);
  const totalSets = Math.max.apply(
    Math,
    currentWorkout.exercises.map(function (o) {
      return o.set;
    }),
  );

  const changeSet = (num) => {
    if (currentSet + num >= 0 && currentSet + num <= totalSets) {
      return setCurrentSet(currentSet + num);
    }
    return setCurrentSet(currentSet);
  };

  console.log('load workout page');

  // conditionally renders set rows by returning classes.set
  const setClass = (currentClass) => {
    console.log(currentClass);
    if (currentClass === currentSet) {
      return classes.currentSetStyle;
    }
    return classes[currentClass];
  };

  return (
    <Layout user={user} currentWorkout={currentWorkout} loading={false}>
      <h1>Workout Page</h1>
      <p> {currentSet} </p>
      <p> {totalSets} </p>
      <Button onClick={() => changeSet(-1)}>Prev Set!</Button>
      <Button onClick={() => changeSet(1)}>Next Set!</Button>

      {loading && <p>Loading login info...</p>}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Exercisess</TableCell>
              <TableCell align="right">Reps</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell align="right">Resistance</TableCell>
              <TableCell align="right">Complete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentWorkout.exercises.map((set) => (
              <TableRow key={set.exercise} className={setClass(set.set)}>
                <TableCell component="th" scope="row" className={classes.tCell}>
                  {set.exercise}
                </TableCell>
                <TableCell align="right" className={classes.tCell}>
                  {set.numReps}
                </TableCell>
                <TableCell align="right" className={classes.tCell}>
                  {set.sets}
                </TableCell>
                <TableCell align="right" className={classes.tCell}>
                  {set.resistance}
                </TableCell>
                <TableCell align="right" className={classes.tCell}>
                  {set.complete}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    console.log('no sesssion and no user');
    return { props: { user: null } };
  }

  const { user } = session;
  try {
    console.log('Workout SSP');
    const { localUser } = await loginLocal({ user });
    console.log('calling getCurrentWorkout');
    const { program } = await getProgram({ localUser });
    console.log(program);
    return {
      props: {
        user: session.user,
        localUser,
        program,
      },
    };
  } catch (e) {
    return { props: { user: session.user } };
  }
}

export default Workout;
