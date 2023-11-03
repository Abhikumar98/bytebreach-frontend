// import { LoadingButton } from '@mui/lab';
import { LoadingButton } from '@mui/lab';
import { ButtonProps, styled } from '@mui/material';
import React from 'react';

const StyledMaterialButton = styled(LoadingButton)`
  svg {
    height: 24px;
    width: 24px;
  }
`;

const Button: React.FC<
  {
    children?: React.ReactNode;
    isLoading?: boolean;
  } & ButtonProps
> = ({
  children,
  size = 'large',
  isLoading,
  variant = 'contained',
  ...props
}) => {
  return (
    <StyledMaterialButton
      variant={variant}
      disabled={isLoading}
      loading={isLoading}
      {...props}
      size={size}
      sx={{
        borderRadius: '15rem',
      }}
    >
      {children}
    </StyledMaterialButton>
  );
};

export default Button;
