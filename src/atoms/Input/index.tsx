import {
  Icon,
  InputAdornment,
  InputLabel,
  styled,
  TextField,
  TextFieldProps,
  Tooltip,
  useTheme,
} from '@mui/material';
import React, { ReactNode } from 'react';

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

const Input: React.FC<
  {
    icon?: ReactNode;
    mandatory?: boolean;
    label?: string;
    tooltipMessage?: string;
  } & TextFieldProps
> = React.forwardRef(
  ({ icon, tooltipMessage, mandatory, label, ...inputProps }, ref) => {
    const theme = useTheme();

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
              boxShadow: theme.shadows[1],
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
        />
      </div>
    );
  }
);

export default Input;
