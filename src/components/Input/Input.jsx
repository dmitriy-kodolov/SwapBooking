/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

const Input = ({
  name, control, defaultValue, className, label, rules,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        className={className}
        label={label}
        fullWidth
        variant="standard"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error ? error.message : null}
      />
    )}
    rules={rules}
  />
);
export default Input;
