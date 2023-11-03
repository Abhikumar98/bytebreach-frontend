import React from 'react';

import BugContainer from '@/components/Project/ProjectDetails/BugContainer';
import ProjectTimeline from '@/components/Project/ProjectDetails/ProjectTimeline';

import PageHeader from '@/atoms/PageHeader';

const ProjectDetails = () => {
  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <ProjectTimeline />
      <div>
        <BugContainer />
      </div>
    </div>
  );
};

export default ProjectDetails;
