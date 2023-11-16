import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import BackButton from '@/assets/arrowLeft.svg';
import Timeline from '@/atoms/Timeline';
import { useAppContext } from '@/context';

import {
  AppRoutes,
  auditorProjectTimelineSteps,
  clientProjectTimelineSteps,
  IProjectStatus,
} from '@/types';

const StyledProjectTimeline = styled('div')`
  svg {
    height: 24px;
    width: 24px;
  }

  .back-container {
    margin-left: -${({ theme }) => theme.spacing(4)};
  }

  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing(8)};
  border-radius: 1rem;
  margin: ${({ theme }) => theme.spacing(4)} 0;
  box-shadow: ${({ theme }) => theme.shadows[2]};

  .timeline-container {
    background: ${({ theme }) => theme.palette.background.paper};
    padding: ${({ theme }) => theme.spacing(5)};
    border-radius: 1rem;
    margin-top: ${({ theme }) => theme.spacing(4)};
  }
`;

const ProjectTimeline: React.FC<{
  projectName: string;
  projectStatus: IProjectStatus;
}> = ({ projectName, projectStatus }) => {
  console.log({ projectStatus });

  const { isClientUser } = useAppContext();

  const { push } = useRouter();

  const backToProjects = () => {
    push(AppRoutes.Homepage);
  };

  return (
    <StyledProjectTimeline>
      <div className='back-container flex items-center gap-2'>
        <div
          onClick={backToProjects}
          className='back-button-container cursor-pointer'
        >
          <BackButton />
        </div>
        <Typography variant='h5' fontWeight='medium'>
          {projectName}
        </Typography>
      </div>
      <div className='timeline-container'>
        <Timeline
          steps={
            isClientUser
              ? clientProjectTimelineSteps
              : auditorProjectTimelineSteps
          }
          currentValue={projectStatus}
        />
      </div>
    </StyledProjectTimeline>
  );
};

export default ProjectTimeline;
