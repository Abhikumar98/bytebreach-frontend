import {
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectProps,
} from '@mui/material';
import React from 'react';

export interface IOption {
  label: string;
  value: string;
}

const Select: React.FC<
  {
    label?: string;
    options: IOption[];
  } & SelectProps
> = ({ label, options, ...selectProps }) => {
  return (
    <div className='mt-2 space-y-2'>
      <InputLabel
        htmlFor={selectProps.name}
        className='flex items-center font-medium'
      >
        {label}
      </InputLabel>
      <MaterialSelect {...selectProps} fullWidth>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MaterialSelect>
    </div>
  );
};

export default Select;
