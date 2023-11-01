// import { LoadingButton } from '@mui/lab';
import { ButtonProps } from '@mui/material';
import { Button as MaterialButton } from '@mui/material';
import React from 'react';

const Button: React.FC<
  {
    children?: React.ReactNode;
    isLoading?: boolean;
  } & ButtonProps
> = ({ children, variant = 'contained', ...props }) => {
  return (
    <MaterialButton
      size='large'
      variant={variant}
      {...props}
      sx={{
        borderRadius: '15rem',
      }}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
