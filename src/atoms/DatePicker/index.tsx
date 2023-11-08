import { InputLabel, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MaterialDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { FC } from 'react';

const MandatoryMark = styled('sup')`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 1rem;
  margin-left: 0.25rem;
  align-self: start;
`;

const DatePicker: FC<{
  label?: string;
  value: string | null;
  mandatory?: boolean;
  onChange: (date: string | null) => void;
}> = ({ value, label, onChange, mandatory }) => {
  return (
    <div className='mt-2 space-y-2'>
      <InputLabel className='flex items-center font-medium'>
        {label}
        {mandatory && <MandatoryMark>*</MandatoryMark>}
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MaterialDatePicker
          value={value}
          onChange={onChange}
          format='DD/MM/YYYY'
          sx={{
            borderRadius: '15rem',
            width: '100%',
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
