import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import ProjectSection from '@/components/Project/ProjectSection';

import { getProjectList } from '@/services';

import { IProject } from '@/types';

const AuditorOngoingProjects = () => {
  const [onGoingProjects, setOngoingProjects] = React.useState<IProject[]>([]);

  const handleFetchOnGoingProjects = async () => {
    try {
      const response = await getProjectList('ongoing');

      setOngoingProjects(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    handleFetchOnGoingProjects();
  }, []);
  return <ProjectSection projects={onGoingProjects} />;
};

export default AuditorOngoingProjects;
