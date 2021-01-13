import { makeStyles } from '@material-ui/core/styles';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  work: {
    color: 'green',
    width: '100%',
  },
  rest: {
    color: 'red',
    width: '100%',
  },
}));
export default function WorkoutTimer({ timerProps }) {
  const classes = useStyles();
  // liveGroup props
  const { updateLiveGroup } = timerProps;

  const { isPlaying } = timerProps;
  const { key } = timerProps;
  const { handleKey } = timerProps;
  const { duration } = timerProps;
  console.log(duration);
  // timer settings
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Next Set!</div>;
    }
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={isPlaying}
      duration={duration}
      colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
      onComplete={() => {
        updateLiveGroup();
        handleKey();
        return [true, 1000];
      }}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}
WorkoutTimer.propTypes = {
  timerProps: PropTypes.shape({
    updateLiveGroup: PropTypes.func,
    isPlaying: PropTypes.bool,
    key: PropTypes.number,
    handleKey: PropTypes.func,
    duration: PropTypes.number,
  }),
};

WorkoutTimer.defaultProps = {
  timerProps: PropTypes.shape({
    updateLiveGroup: null,
    isPlaying: false,
    key: 1,
    handleKey: null,
    duration: 10,
  }),
};
