import React from 'react';

import ProjectSection from '@/components/Project/ProjectSection';

const AuditorDoneProjects = () => {
  const projects = [
    {
      name: 'Auditor Project 1',
      status: 'Done',
    },
    {
      name: 'Auditor Project 1',
      status: 'Done',
    },
    {
      name: 'Auditor Project 1',
      status: 'Done',
    },
    {
      name: 'Auditor Project 1',
      status: 'Done',
    },
    {
      name: 'Auditor Project 1',
      status: 'Done',
    },
  ];
  return <ProjectSection projects={projects} />;
};

export default AuditorDoneProjects;
