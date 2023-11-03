import {
  Color,
  Icon,
  InputAdornment,
  InputLabel,
  styled,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { ReactNode } from 'react';

import useTheme from '@/hooks/useTheme';

import Info from '@/assets/info.svg';

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

const MandatoryMark = styled('sup')`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 1rem;
  margin-left: 0.25rem;
  align-self: start;
`;

const StyledErrorMessage = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-left: 1rem;
`;

const Input: React.FC<
  {
    icon?: ReactNode;
    mandatory?: boolean;
    label?: string;
    tooltipMessage?: string;
    errors?: Record<string, any>;
  } & TextFieldProps
> = React.forwardRef(
  ({ icon, tooltipMessage, errors, mandatory, label, ...inputProps }, ref) => {
    const theme = useTheme();

    console.log('color', (theme.palette?.secondary as Color)?.[200]);

    return (
      <div className='mt-2 space-y-2'>
        <InputLabel
          htmlFor={inputProps.name}
          className='flex items-center font-medium'
        >
          {label}
          {mandatory && <MandatoryMark>*</MandatoryMark>}
          {tooltipMessage && (
            <Tooltip title={tooltipMessage}>
              <Icon
                sx={{
                  height: '20px',
                  width: '20px',
                  marginLeft: '0.5rem',
                }}
              >
                <Info />
              </Icon>
            </Tooltip>
          )}
        </InputLabel>

        <InputField
          InputProps={{
            sx: {
              boxShadow: theme.shadows?.[1],
              borderRadius: '15rem',
            },
            endAdornment: (
              <StyledInputAdjournment position='end'>
                {icon}
              </StyledInputAdjournment>
            ),
          }}
          inputRef={ref}
          {...inputProps}
          name={inputProps.name}
          id={inputProps.name}
          error={!!errors?.[inputProps.name ?? '']}
        />
        {!!errors?.[inputProps.name ?? '']?.message && (
          <StyledErrorMessage fontSize={0.75}>
            {errors?.[inputProps.name ?? '']?.message}
          </StyledErrorMessage>
        )}
      </div>
    );
  }
);

export default Input;
