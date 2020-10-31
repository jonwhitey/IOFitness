import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import { TextField, Slider } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import SelectField from './SelectField';
import { styleForm, styleTextField } from './SharedStyles';

function BuildWorkout({ register, control, activeStep, progressions}) {
  const intensityArray = ['Heavy', 'Medium', 'Light'];

  console.log('activeStep');
  console.log(activeStep);

  return (
    <section>
      <h1 id="add-exercise">Build Your Workout</h1>
      <p>Workout:</p>
      <div>
        <TextField
          style={styleTextField}
          required
          name={`training[${activeStep}].workoutName`}
          label="Workout Name"
          defaultValue=""
          autoFocus
          inputRef={register}
        />
        <section>
          <p>Number of Exercises</p>
          <Controller
            name={`training[${activeStep}].numExercises`}
            control={control}
            defaultValue={0}
            render={(props) => (
              <Slider
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={12}
                min={0}
                step={1}
                marks
              />
            )}
          />
        </section>
      </div>
    </section>
  );
}

BuildWorkout.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  array: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  handleMultiChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};

BuildWorkout.defaultProps = {
  user: null,
};

export default BuildWorkout;
