import React from 'react';

import ProjectSection from '@/components/Project/ProjectSection';

const ClientDoneProjects = () => {
  const projects = [
    {
      name: 'Project 1',
      status: 'Done',
    },
    {
      name: 'Project 1',
      status: 'Done',
    },
    {
      name: 'Project 1',
      status: 'Done',
    },
    {
      name: 'Project 1',
      status: 'Done',
    },
    {
      name: 'Project 1',
      status: 'Done',
    },
  ];

  return <ProjectSection projects={projects} />;
};

export default ClientDoneProjects;
