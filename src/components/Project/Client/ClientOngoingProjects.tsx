import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import ProjectSection from '@/components/Project/ProjectSection';

import { getProjectList } from '@/services';

import { IProject } from '@/types';

const ClientOngoingProjects = () => {
  const [onGoingProjects, setOnGoingProjects] = React.useState<IProject[]>([]);

  const handleFetchOnGoingProjects = async () => {
    try {
      console.log('Calling from here');
      const response = await getProjectList('ongoing');

      setOnGoingProjects(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    handleFetchOnGoingProjects();
  }, []);

  return <ProjectSection projects={onGoingProjects} />;
};

export default ClientOngoingProjects;
