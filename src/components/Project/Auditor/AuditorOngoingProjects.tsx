import React from 'react';

import ProjectSection from '@/components/Project/ProjectSection';

const AuditorOngoingProjects = () => {
  const projects = [
    {
      name: 'Auditor Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Auditor Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Auditor Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Auditor Project 1',
      status: 'Ongoing',
    },
    {
      name: 'Auditor Project 1',
      status: 'Ongoing',
    },
  ];
  return <ProjectSection projects={projects} />;
};

export default AuditorOngoingProjects;
