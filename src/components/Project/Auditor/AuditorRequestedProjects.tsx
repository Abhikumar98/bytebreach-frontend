import React from 'react';

import ProjectSection from '@/components/Project/ProjectSection';

const AuditorRequestedProjects = () => {
  const projects = [
    {
      name: 'Auditor Project 1',
      status: 'Requested',
    },
    {
      name: 'Auditor Project 1',
      status: 'Requested',
    },
    {
      name: 'Auditor Project 1',
      status: 'Requested',
    },
    {
      name: 'Auditor Project 1',
      status: 'Requested',
    },
    {
      name: 'Auditor Project 1',
      status: 'Requested',
    },
  ];
  return <ProjectSection projects={projects} />;
};

export default AuditorRequestedProjects;
