import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const PercentInput = ({ value, onChange, ...props }) => (
  <TextField
    {...props}
    label="Tax Rate"
    type="number"
    value={value || ''}
    onChange={event => onChange(event.target.value)}
    margin="normal"
    InputProps={{
      startAdornment: <InputAdornment position="start">%</InputAdornment>,
    }}
  />
);

export default PercentInput;
