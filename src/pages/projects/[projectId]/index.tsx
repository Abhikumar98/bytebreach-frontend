import { styled } from '@mui/material';
import React from 'react';

import BugContainer from '@/components/Project/Bug/BugContainer';
import ProjectDetailsTile from '@/components/Project/ProjectDetails/ProjectDetailsTile';
import ProjectTimeline from '@/components/Project/ProjectDetails/ProjectTimeline';

import PageHeader from '@/atoms/PageHeader';

import { IProject } from '@/types';

const StyledProjectContainer = styled('div')`
  display: flex;
  gap: 1rem;
  width: 100%;

  .project-details-tile {
    width: calc(100% / 3);
  }
  .bug-container {
    width: calc((100% / 3) * 2);
  }
`;

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = React.useState<IProject | null>(
    null
  );

  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <ProjectTimeline projectName='Test project name' />
      <StyledProjectContainer>
        <div className='bug-container'>
          <BugContainer />
        </div>
        <div className='project-details-tile'>
          <ProjectDetailsTile />
        </div>
      </StyledProjectContainer>
    </div>
  );
};

export default ProjectDetails;
