import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';


const TextInput = ({
  input,
  meta,
  ...rest
}) => {
  const showError = Boolean(meta.touched && meta.error);
  return (
    <TextField
      { ...input }
      { ...rest }
      onChange={(event) => input.onChange(event.target.value)}
      value={input.value}
      error={showError}
      helperText={showError ? meta.error : ( rest.helperText || '' )}
    />
  );
};
TextInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default TextInput;
