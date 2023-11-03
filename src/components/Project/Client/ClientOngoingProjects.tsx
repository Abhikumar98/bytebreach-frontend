import React from 'react';

import ProjectSection from '@/components/Project/ProjectSection';

const ClientOngoingProjects = () => {
  const projects = [
    {
      name: 'Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Project 1',
      status: 'Ongoing',
    },
  ];
  return <ProjectSection projects={projects} />;
};

export default ClientOngoingProjects;
