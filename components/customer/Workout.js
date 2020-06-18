/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import notify from '../../lib/notifier';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    size: 'small',
    maxWidth: 800,
  },
  exercise: {
    colspan: '2',
    align: 'right',
    size: 'small',
  },
  setName: {
    padding: 'none',
    colspan: '5',
    align: 'center',
  },
}));

export default function Workout(props) {
  const [value, setValue] = React.useState(0);
  const { workoutName, date, training } = props;
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (training === undefined || training.length === 0) {
    return (
      <div>
        <p> No training!</p>
      </div>
    );
  }
  return (
    <div>
      <h1>{workoutName}</h1>
      <p>{date}</p>
      {training.map((t) => (
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.setName}>{t.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.exercise}>Exercise</TableCell>
                <TableCell align="right" padding="none" size="small">
                  Sets
                </TableCell>
                <TableCell align="right" padding="none" size="small">
                  Reps
                </TableCell>
                <TableCell align="right" padding="none" size="small">
                  Resistance
                </TableCell>
              </TableRow>
            </TableHead>
            {t.exercises.map((exercise) => (
              <TableBody>
                {exercise.set.map((row) => (
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        // checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                      />
                    </TableCell>
                    <TableCell align="left">{exercise.name}</TableCell>
                    <TableCell align="right">{row.sets}</TableCell>
                    <TableCell align="right">{row.reps.join(', ')}</TableCell>
                    <TableCell align="right">{row.resistance.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      ))}
    </div>
  );
}

Workout.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
  workoutName: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  training: PropTypes.shape([
    {
      name: PropTypes.string,
      exercises: PropTypes.shape([
        {
          name: PropTypes.string,
          options: PropTypes.shape([
            {
              prgression: PropTypes.string,
            },
          ]),
          set: PropTypes.shape([
            {
              number: PropTypes.number,
              reps: PropTypes.array,
              resistance: PropTypes.array,
            },
          ]),
          equipment: PropTypes.string,
          workTime: PropTypes.number,
          restTime: PropTypes.number,
          complete: PropTypes.boolean,
        },
      ]),
    },
  ]),
};

Workout.defaultProps = {
  user: '',
  date: '',
  workoutName: '',
  training: [],
};
