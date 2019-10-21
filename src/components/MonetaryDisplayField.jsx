import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const MonetaryDisplayField = ({ value, ...props }) => (
  <TextField
    {...props}
    value={value.toFixed(2)}
    disabled
    InputProps={{
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    }}
  />
);

export default MonetaryDisplayField;
