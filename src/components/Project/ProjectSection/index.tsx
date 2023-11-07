import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { AppRoutes } from '@/types';

const StyledProjectSectionHeader = styled('div')`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(8)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 -${({ theme }) => theme.spacing(7)};
`;

const StyledProjectSectionItem = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid ${({ theme }) => theme.palette.divider}; */
  margin: 8px -${({ theme }) => theme.spacing(5)};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(6)};
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.palette.background.paper};
  }
`;

const ProjectSection: React.FC<{
  projects: any[];
}> = ({ projects }) => {
  const { push } = useRouter();

  const handleProjectRoute = (projectId: string) => {
    push(AppRoutes.ProjectDetails.replace('{projectId}', projectId));
  };

  return (
    <div>
      <StyledProjectSectionHeader>
        <div>Project</div>
        <div>Status</div>
      </StyledProjectSectionHeader>
      {projects.map((project, index) => (
        <StyledProjectSectionItem
          key={index}
          onClick={() => handleProjectRoute('1')}
        >
          <div>{project.name}</div>
          <div>{project.status}</div>
        </StyledProjectSectionItem>
      ))}
    </div>
  );
};

export default ProjectSection;
