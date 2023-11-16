import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import BugContainer from '@/components/Project/Bug/BugContainer';
import AuditorQuotation from '@/components/Project/ProjectDetails/AuditorQuotation';
import AuditorTable from '@/components/Project/ProjectDetails/AuditorTable';
import PartialPayment from '@/components/Project/ProjectDetails/PartialPaymentSection';
import ProjectDetailsTile from '@/components/Project/ProjectDetails/ProjectDetailsTile';
import ProjectTimeline from '@/components/Project/ProjectDetails/ProjectTimeline';

import PageHeader from '@/atoms/PageHeader';
import { useAppContext } from '@/context';
import { getProjectDetails } from '@/services';

import { IProject, IProjectStatus } from '@/types';

const StyledProjectContainer = styled('div')`
  display: flex;
  gap: 1rem;
  width: 100%;

  .project-details-tile {
    width: calc(100% / 3);
  }
  .section-container {
    width: calc((100% / 3) * 2);
  }
`;

const ProjectDetails = () => {
  const {
    query: { projectId },
  } = useRouter();

  const { isClientUser } = useAppContext();

  const [projectDetails, setProjectDetails] = React.useState<IProject | null>(
    null
  );

  const handleFetchProjectDetails = async () => {
    try {
      const response = await getProjectDetails(projectId as string);

      setProjectDetails(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    handleFetchProjectDetails();
  }, []);

  const clientProjectSectionStatusMap: Record<IProjectStatus, ReactNode> = {
    [IProjectStatus.AUDITOR_SELECTION]: (
      <div className='flex items-center gap-2' />
    ),
    [IProjectStatus.AUDITOR_CONFIRMATION]: (
      <AuditorTable handleUpdateProject={handleFetchProjectDetails} />
    ),
    [IProjectStatus.PARITAL_PAYMENT]: <PartialPayment />,
    [IProjectStatus.AUDIT_IN_PROGRESS]: <BugContainer />,
    [IProjectStatus.MITIGATION_REVIEW]: <BugContainer />,
    [IProjectStatus.FINAL_PAYMENT]: <BugContainer />,
  };

  const auditorProjectSectionStatusMap: Record<IProjectStatus, ReactNode> = {
    [IProjectStatus.AUDITOR_SELECTION]: (
      <div className='flex items-center gap-2' />
    ),
    [IProjectStatus.AUDITOR_CONFIRMATION]: (
      <AuditorQuotation handleUpdateProject={handleFetchProjectDetails} />
    ),
    [IProjectStatus.PARITAL_PAYMENT]: <PartialPayment />,
    [IProjectStatus.AUDIT_IN_PROGRESS]: <BugContainer />,
    [IProjectStatus.MITIGATION_REVIEW]: <BugContainer />,
    [IProjectStatus.FINAL_PAYMENT]: <BugContainer />,
  };

  console.log({
    status: projectDetails,
    clientProjectSectionStatusMap,
  });

  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <ProjectTimeline
        projectStatus={
          projectDetails?.status ?? IProjectStatus.AUDITOR_SELECTION
        }
        projectName={projectDetails?.project_title ?? ''}
      />
      <StyledProjectContainer>
        <div className='section-container'>
          {projectDetails?.status &&
            (isClientUser
              ? clientProjectSectionStatusMap[projectDetails?.status]
              : auditorProjectSectionStatusMap[projectDetails?.status])}
        </div>
        <div className='project-details-tile'>
          <ProjectDetailsTile projectDetails={projectDetails} />
        </div>
      </StyledProjectContainer>
    </div>
  );
};

export default ProjectDetails;
