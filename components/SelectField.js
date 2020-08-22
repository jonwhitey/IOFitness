import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { styleSelectInput } from './SharedStyles';

function SelectField({ label, defaultValue, name, array, control, handleMultiChange, errors }) {
  console.log(handleMultiChange);

  return (
    <FormControl className="formInput" error={Boolean(errors.wordlevel)}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>
      <Controller
        as={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Select defaultValue={defaultValue}>
            {array.map((x) => (
              <MenuItem name={x} key={x} onChange={handleMultiChange} isMulti value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        }
        name={name}
        rules={{ required: 'this is required' }}
        control={control}
        style={styleSelectInput}
      />
    </FormControl>
  );
}

SelectField.propTypes = {
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

SelectField.defaultProps = {
  user: null,
};

export default SelectField;
