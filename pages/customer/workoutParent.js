import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';

import withAuth from '../../lib/withAuth';
import Workout from '../../components/customer/Workout';

import { getWorkout } from '../../lib/api/customer';

class WorkoutParent extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      date: '',
      workoutName: '',
      training: [],
    };
    this.getWorkout = this.getWorkout.bind(this);
  }

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

  getWorkout = async () => {
    console.log('GET WORKOUT');
    const response = await getWorkout();
    const { workout } = response;
    console.log('got workout');
    console.log(workout);
    console.log(this.state);
    this.setState({
      workoutName: workout.name,
      date: workout.date,
      training: workout.training,
    });
    console.log('State');
    console.log(this.state);
  };

  render() {
    const { user, router, redirectUrl } = this.props;
    const { workoutName, training, date } = this.state;
    console.log('/workoutParent state');
    console.log(this.state);
    return (
      <section>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id="delete-user-button"
          onClick={this.getWorkout}
        >
          Get workout
        </Button>
        <Workout
          workoutName={workoutName}
          training={training}
          date={date}
          redirectUrl={!redirectUrl ? null : redirectUrl}
        />
      </section>
    );
  }
}

export default withAuth(WorkoutParent);

/* eslint-disable react/prefer-stateless-function */

// Index is a little dashboard that shows the functionality of withAuth
// withAuth passed the user object as a prop to Index

// eslint-disable-next-line react/prefer-stateless-function

/*
<div>
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
      </div><div>
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
      */
