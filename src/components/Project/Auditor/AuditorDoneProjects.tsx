import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import ProjectSection from '@/components/Project/ProjectSection';

import { getProjectList } from '@/services';

import { IProject } from '@/types';

const AuditorDoneProjects = () => {
  const [doneProjects, setDoneProjects] = React.useState<IProject[]>([]);

  const handleFetchOnGoingProjects = async () => {
    try {
      const response = await getProjectList('done');

      setDoneProjects(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    handleFetchOnGoingProjects();
  }, []);
  return <ProjectSection projects={doneProjects} />;
};

export default AuditorDoneProjects;
