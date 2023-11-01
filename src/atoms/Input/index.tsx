import styled from '@emotion/styled';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { ReactNode } from 'react';

const InputField = styled(TextField)`
  &.MuiTextField-root,
  fieldset {
    border-radius: 15rem;
  }

  width: 100%;

  .MuiInputBase-root {
    width: 100%;
  }
`;

const StyledInputAdjournment = styled(InputAdornment)`
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Input: React.FC<
  { icon?: ReactNode; label?: string } & TextFieldProps
> = ({ icon, label, ...inputProps }) => {
  return (
    <div className='relative mt-2 space-y-2'>
      <label htmlFor={inputProps.id} className='text-lg font-semibold'>
        {label}
      </label>
      <InputField
        InputProps={{
          endAdornment: (
            <StyledInputAdjournment position='end'>
              {icon}
            </StyledInputAdjournment>
          ),
        }}
        {...inputProps}
        name={inputProps.id}
      />
    </div>
  );
};

export default Input;
