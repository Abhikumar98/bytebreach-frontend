import { styled } from '@mui/material';
import React from 'react';

const StyledProjectSectionContainer = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  padding: 1rem ${({ theme }) => theme.spacing(12)};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const ProjectSectionContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <StyledProjectSectionContainer>{children}</StyledProjectSectionContainer>
  );
};

export default ProjectSectionContainer;
