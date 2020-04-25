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

import { buyBook } from '../../lib/api/customer';
import notify from '../../lib/notifier';

import env from '../../lib/env';

const { StripePublishableKey } = env;

const styleBuyButton = {
  margin: '20px 20px 20px 0px',
  font: '24px Muli',
};

class Workout extends React.Component {
  // 1. propTypes and defaultProps

  // eslint-disable-file react/static-property-placement
  static propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string,
    }),
    workoutName: PropTypes.string,
    date: PropTypes.date,
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

  static defaultProps = {
    user: '',
    date: '',
    workoutName: '',
    training: [],
  };

  // 2. constructor (set inital state)

  constructor(props) {
    super(props);
    // this.onComplete = this.bind.onComplete(this);
  }

  // 3. onToken function

  // 4. onLoginClicked function

  onComplete = () => {
    const { user } = this.props;
  };

  render() {
    // 5. define variable with props and state

    const { workoutName, date, training } = this.props;

    // eslint-disable-next-line no-return-assign
    return (
      <div>
        <h1>{workoutName}</h1>
        <h2>{date}</h2>
        {training.map((t) => (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={t.name}
            >
              <Checkbox
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                // checked={rowCount > 0 && numSelected === rowCount}
                // onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
              <Typography>{t.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colspan={2}>Exercise</TableCell>
                      <TableCell align="right">Sets&nbsp;</TableCell>
                      <TableCell align="right">Reps&nbsp;</TableCell>
                      <TableCell align="right">Resistance&nbsp;</TableCell>
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default Workout;
