import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import ProjectSection from '@/components/Project/ProjectSection';

import { getProjectList } from '@/services';

import { IProject } from '@/types';

const AuditorRequestedProjects = () => {
  const [requestedProjects, setRequestedProjects] = React.useState<IProject[]>(
    []
  );

  const handleFetchOnGoingProjects = async () => {
    try {
      const response = await getProjectList('requested');

      setRequestedProjects(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    handleFetchOnGoingProjects();
  }, []);
  return <ProjectSection projects={requestedProjects} />;
};

export default AuditorRequestedProjects;
