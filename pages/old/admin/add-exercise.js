import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SelectField from '../../components/SelectField';
import { styleForm, styleTextField } from '../../components/SharedStyles';
import {
  typeArray,
  bodyPartArray,
  unilateralOrBilateralArray,
  isoOrMovementArray,
  upperbodyTypeArray,
  lowerbodyTypeArray,
  coreTypeArray,
  mobilityTypeArray,
} from '../../lib/addExerciseArrays';


function AddExercise(props) {
  const { user } = props;
  const { headers } = props;
  const classes = useStyles();
  const { form, formInput } = classes;
  const { register, handleSubmit, setValue, errors, control, watch } = useForm({
    defaultValues: {
      progressions: [''],
    },
  });
  const onSubmit = (data) => console.log(data);

  const handleMultiChange = (selectedOption) => {
    setValue('reactSelect', selectedOption);
  };

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: 'progressions',
  });

  const exerciseType = watch('Exercise Type');
  const bodyPart = watch('Body Part');

  return (
    <section>
      <h1 id="add-exercise">Add Exercise</h1>
      <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            style={styleTextField}
            required
            name="Exercise Name"
            label="Exercise Name"
            defaultValue=""
            autoFocus
            inputRef={register}
          />
          <SelectField
            label="Select Exercise Type"
            defaultValue=""
            name="Exercise Type"
            array={typeArray}
            control={control}
            handleMultiChange={handleMultiChange}
            errors={errors}
          />
          {exerciseType === 'exercise' || exerciseType === 'mobility' ? (
            <div>
              <SelectField
                label="Select Body Part"
                defaultValue=""
                name="Body Part"
                array={bodyPartArray}
                control={control}
                handleMultiChange={handleMultiChange}
                errors={errors}
              />
              <SelectField
                label="Select Bilateral or Unilateral"
                defaultValue=""
                name="Bilateral or Unilateral"
                array={unilateralOrBilateralArray}
                control={control}
                handleMultiChange={handleMultiChange}
                errors={errors}
              />
            </div>
          ) : null}
          {bodyPart === 'upperbody' && (
            <SelectField
              label="Select Upperbody Movement"
              defaultValue=""
              name="Upperbody Movement"
              array={upperbodyTypeArray}
              control={control}
              handleMultiChange={handleMultiChange}
              errors={errors}
            />
          )}
          {bodyPart === 'lowerbody' && (
            <SelectField
              label="Select Lowerbody Movement"
              defaultValue=""
              name="Lowerbody Movement"
              array={lowerbodyTypeArray}
              control={control}
              handleMultiChange={handleMultiChange}
              errors={errors}
            />
          )}
          {exerciseType === 'mobility' && (
            <SelectField
              label="Select Mobility Type"
              defaultValue=""
              name="Mobility Type"
              array={mobilityTypeArray}
              control={control}
              handleMultiChange={handleMultiChange}
              errors={errors}
            />
          )}
          {bodyPart === 'core' && (
            <SelectField
              label="Select Core Type"
              defaultValue=""
              name="Core Type"
              array={coreTypeArray}
              control={control}
              handleMultiChange={handleMultiChange}
              errors={errors}
            />
          )}
          <FormHelperText>{errors.wordlevel && errors.wordlevel.message}</FormHelperText>
          <List>
            {fields.map((item, index) => (
              <ListItem key={item.id} alignItems="center" disableGutters divider>
                <Controller
                  as={<TextField />}
                  defaultValue=""
                  label="List Exercise Progressions"
                  name={`progressions[${index}]`}
                  control={control}
                  fullWidth
                />
                <ListItemIcon type="button" className={classes.icon} onClick={() => append(index)}>
                  <AddIcon />
                </ListItemIcon>
                <ListItemIcon type="button" className={classes.icon} onClick={() => remove(index)}>
                  <DeleteIcon />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>

          <Button type="submit" fullWidth variant="contained" color="primary">
            Add Exercise
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </section>
  );
}

AddExercise.getInitialProps = async ({ req, res }) => {
  console.log('GET INITAL PROPS');
  const headers = {};
  if (req && !req.user) {
    res.redirect('/login');
  }
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
    console.log('HEADERS!');
  }
};

const useStyles = makeStyles((theme) => ({
  email: {
    color: 'red',
  },
  icon: {
    textAlign: 'center',
    align: 'center',
  },
}));

AddExercise.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

AddExercise.defaultProps = {
  user: null,
};

export default AddExercise;
