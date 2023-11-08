import { InputLabel, Slider, SliderOwnProps, styled } from '@mui/material';
import React, { FC } from 'react';

const MandatoryMark = styled('sup')`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 1rem;
  margin-left: 0.25rem;
  align-self: start;
`;

const RangeSlider: FC<
  {
    value: number[];
    setValue: (value: number[]) => void;
    label?: string;
    mandatory?: boolean;
  } & Omit<SliderOwnProps, 'children'>
> = ({ value, setValue, label, mandatory }) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className='mt-2 space-y-2'>
      <InputLabel className='flex items-center font-medium'>
        {label}
        {mandatory && <MandatoryMark>*</MandatoryMark>}
      </InputLabel>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
      />
    </div>
  );
};

export default RangeSlider;
