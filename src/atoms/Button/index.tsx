// import { LoadingButton } from '@mui/lab';
import { ButtonProps, styled } from '@mui/material';
import { Button as MaterialButton } from '@mui/material';
import React from 'react';

const StyledMaterialButton = styled(MaterialButton)`
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
> = ({ children, size = 'large', variant = 'contained', ...props }) => {
  return (
    <StyledMaterialButton
      variant={variant}
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
