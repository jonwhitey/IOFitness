import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { styleSelectInput } from './SharedStyles';

function SelectField({ label, defaultValue, name, array, control, handleMultiChange, errors, objectKey }) {
  console.log(array);
  console.log(objectKey);
  return (
    <FormControl className="formInput" error={Boolean(errors)} style={styleSelectInput}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {label}
      </InputLabel>
      <Controller
        render= {({ field }) => (
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Select defaultValue={defaultValue}>
            {array.map((x) => (
              <MenuItem name={x} key={x} onChange={handleMultiChange} isMulti value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        )}
        name={name}
        rules={{ required: 'this is required' }}
        control={control}
      />
    </FormControl>
  );
}

SelectField.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  array: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  handleMultiChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
};

SelectField.defaultProps = {
  user: null,
};

export default SelectField;
