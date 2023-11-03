import { styled } from '@mui/material';
import React, { ReactNode } from 'react';

const StyledProjectContainer = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 0 ${({ theme }) => theme.spacing(8)};
  margin-top: ${({ theme }) => theme.spacing(5)};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    border-bottom: 2px ${({ theme }) => theme.palette.divider} solid;
  }
`;

const ProjectContainer: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <StyledProjectContainer>{children}</StyledProjectContainer>;
};

export default ProjectContainer;
