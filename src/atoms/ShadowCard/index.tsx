import { styled } from '@mui/material';
import React, { ReactNode } from 'react';

type IShadowCard = 'small' | 'medium' | 'large';

const paddingMap: Record<IShadowCard, { x: number; y: number }> = {
  large: {
    x: 12,
    y: 8,
  },
  medium: {
    x: 8,
    y: 6,
  },
  small: {
    x: 6,
    y: 4,
  },
};

const StyledCard = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: IShadowCard }>`
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme, size }) => theme.spacing(paddingMap[size].y)}
    ${({ theme, size }) => theme.spacing(paddingMap[size].x)};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows[2]};
`;

const ShadowCard: React.FC<{
  children: ReactNode;
  size?: IShadowCard;
}> = ({ children, size = 'large' }) => {
  return <StyledCard size={size}>{children}</StyledCard>;
};

export default ShadowCard;
