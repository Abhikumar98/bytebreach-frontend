import {
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectProps,
  styled,
} from '@mui/material';
import React from 'react';

export interface IOption {
  label: string;
  value: string;
}

const MandatoryMark = styled('sup')`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 1rem;
  margin-left: 0.25rem;
  align-self: start;
`;

const Select: React.FC<
  {
    label?: string;
    options: IOption[];
    mandatory?: boolean;
  } & SelectProps
> = ({ label, options, mandatory, ...selectProps }) => {
  return (
    <div className='mt-2 space-y-2'>
      <InputLabel
        htmlFor={selectProps.name}
        className='flex items-center font-medium'
      >
        {label}
        {mandatory && <MandatoryMark>*</MandatoryMark>}
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
