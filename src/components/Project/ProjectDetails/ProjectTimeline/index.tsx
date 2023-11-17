import RefreshIcon from '@mui/icons-material/Refresh';
import { Icon, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { defaultErrorMessage } from '@/lib/helper';

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
  handleProjectRefresh: () => void;
  projectName: string;
  projectStatus: IProjectStatus;
}> = ({ projectName, projectStatus, handleProjectRefresh }) => {
  console.log({ projectStatus });

  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleDataRefresh = async () => {
    try {
      setIsLoaded(true);
      await handleProjectRefresh();
    } catch (error) {
      defaultErrorMessage(error);
    } finally {
      setIsLoaded(false);
    }
  };

  const { isClientUser } = useAppContext();

  const { push } = useRouter();

  const backToProjects = () => {
    push(AppRoutes.Homepage);
  };

  return (
    <StyledProjectTimeline>
      <div className='back-container relative flex items-center gap-2'>
        <div
          onClick={backToProjects}
          className='back-button-container cursor-pointer'
        >
          <BackButton />
        </div>
        <Typography variant='h5' fontWeight='medium'>
          {projectName}
        </Typography>

        <div
          onClick={handleDataRefresh}
          className={`absolute right-0 cursor-pointer ${
            isLoaded ? 'animate-spin' : ''
          }`}
        >
          <Icon>
            <RefreshIcon />
          </Icon>
        </div>
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
