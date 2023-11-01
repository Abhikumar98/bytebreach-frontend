import styled from '@emotion/styled';
import {
  InputAdornment,
  TextField,
  TextFieldProps,
  useTheme,
} from '@mui/material';
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
  const theme = useTheme();

  return (
    <div className='mt-2 space-y-2'>
      <label htmlFor={inputProps.id} className='font-medium'>
        {label}
      </label>
      <InputField
        InputProps={{
          sx: {
            boxShadow: theme.shadows[1],
            borderRadius: '15rem',
          },
          endAdornment: (
            <StyledInputAdjournment position='end'>
              {icon}
            </StyledInputAdjournment>
          ),
        }}
        {...inputProps}
        color='secondary'
        name={inputProps.id}
      />
    </div>
  );
};

export default Input;
