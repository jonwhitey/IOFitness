import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
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

import withAuth from '../../lib/withAuth';

import { getWorkout } from '../../lib/api/customer';

const createData = (name, type, sets, reps) => {
  return { name, type, sets, reps };
};

const warmup = [
  createData('Hip Thrusts', 'Single Leg', 3, 10, 'bodyweight'),
  createData('Dead Bugs', 'Double Leg', 3, 20, 'bodyweight'),
  createData('90 / 90 Get Ups', 'Unassisted', 3, 10, 'bodyweight'),
  createData('Knee Flexion', 'Unassisted', 3, 10, 'bodyweight'),
];

const cupletOne = [
  createData('Squats', 'Overhead', 3, 20, 'dowel'),
  createData('Pullup Hangs', 'Assisted', 3, '20 seconds', 'bodyweight'),
];

const cupletTwo = [
  createData('Lunges', 'Slider', 3, 20, 'bodyweight'),
  createData('Dip Holds', 'Unassisted', 3, '20 seconds', 'bodyweight'),
];

const cupletThree = [
  createData('XOS', 'Lat Fly', 3, 20, '7lbs'),
  createData('Balance Complex', 'Slider', 3, 10, 'bodyweight'),
];

const cupletFour = [
  createData('XOPress', 'Overhead', 3, 20, '15lbs'),
  createData('Single Leg Deadlift', 'Contralateral Kickstand', 3, 10, '16kg'),
];

class Workout extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    user: null,
  };

  static onSelectAllClick = () => {};

  // generate MyBookList server-side
  static async getInitialProps({ req, res }) {
    // if not logged in, redirect to login page
    if (req && !req.user) {
      res.redirect('/login');
    }

    // initialize headers obejct, if request object has a cookie, assign it to the headers object
    const headers = {};
    if (req && req.headers && req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }

    // send request to getMyBookList, assign response to purchasedBooks, return response
  }

  render() {
    const { user } = this.props;
    console.log(this.props);
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="Warmup"
          >
            <Typography>Warm Up</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        //indeterminate={numSelected > 0 && numSelected < rowCount}
                        //checked={rowCount > 0 && numSelected === rowCount}
                        //onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                      />
                    </TableCell>
                    <TableCell>Exercise</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Sets&nbsp;</TableCell>
                    <TableCell align="right">Reps&nbsp;</TableCell>
                    <TableCell align="right">Resistance&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warmup.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.sets}</TableCell>
                      <TableCell align="right">{row.reps}</TableCell>
                      <TableCell align="right">{row.resistance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="Warmup"
          >
            <Typography>Cuplet One</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Sets&nbsp;</TableCell>
                    <TableCell align="right">Reps&nbsp;</TableCell>
                    <TableCell align="right">Resistance&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cupletOne.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.sets}</TableCell>
                      <TableCell align="right">{row.reps}</TableCell>
                      <TableCell align="right">{row.resistance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="Warmup"
          >
            <Typography>Cuplet Two</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Sets&nbsp;</TableCell>
                    <TableCell align="right">Reps&nbsp;</TableCell>
                    <TableCell align="right">Resistance&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cupletTwo.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.sets}</TableCell>
                      <TableCell align="right">{row.reps}</TableCell>
                      <TableCell align="right">{row.resistance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="Warmup"
          >
            <Typography>Cuplet Three</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Sets&nbsp;</TableCell>
                    <TableCell align="right">Reps&nbsp;</TableCell>
                    <TableCell align="right">Resistance&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cupletThree.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.sets}</TableCell>
                      <TableCell align="right">{row.reps}</TableCell>
                      <TableCell align="right">{row.resistance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="Warmup"
          >
            <Typography>Cuplet Four</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Sets&nbsp;</TableCell>
                    <TableCell align="right">Reps&nbsp;</TableCell>
                    <TableCell align="right">Resistance&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cupletFour.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.sets}</TableCell>
                      <TableCell align="right">{row.reps}</TableCell>
                      <TableCell align="right">{row.resistance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withAuth(Workout);

/* eslint-disable react/prefer-stateless-function */

// Index is a little dashboard that shows the functionality of withAuth
// withAuth passed the user object as a prop to Index

// eslint-disable-next-line react/prefer-stateless-function
