import { styled } from '@mui/material';
import React from 'react';

import BugContainer from '@/components/Project/ProjectDetails/BugContainer';
import ProjectDetailsTile from '@/components/Project/ProjectDetails/ProjectDetailsTile';
import ProjectTimeline from '@/components/Project/ProjectDetails/ProjectTimeline';

import PageHeader from '@/atoms/PageHeader';

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
  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <ProjectTimeline />
      <StyledProjectContainer>
        <div className='project-details-tile'>
          <ProjectDetailsTile />
        </div>
        <div className='bug-container'>
          <BugContainer />
        </div>
      </StyledProjectContainer>
    </div>
  );
};

export default ProjectDetails;
