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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { buyBook } from '../../lib/api/customer';
import notify from '../../lib/notifier';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  console.log('INDEX');
  console.log(index);
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 448,
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Workout(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { workoutName, date, training } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <h1>{workoutName}</h1>
      <h2>{date}</h2>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {training.map((t) => (
            <Tab label={t.name} {...a11yProps(training.findIndex((i) => i.name === t.name))} />
          ))}
        </Tabs>

        {training.map((t) => (
          <TabPanel value={value} index={training.findIndex((i) => i.name === t.name)}>
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
          </TabPanel>
        ))}
      </div>
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

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
