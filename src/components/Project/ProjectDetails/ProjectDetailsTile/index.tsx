import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import AuditorProjectTile from '@/components/Project/ProjectDetails/ProjectDetailsTile/AuditorProjectTile';
import ClientProjectTile from '@/components/Project/ProjectDetails/ProjectDetailsTile/ClientProjectTile';

import { useAppContext } from '@/context';

import { IProject, IProjectStatus } from '@/types';

const StyledProjectDetailsTile = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[2]};
  padding: ${({ theme }) => theme.spacing(8)};
  border-radius: 1rem;
  background: ${({ theme }) => theme.palette.background.default};
  /* max-height: calc(100vh - 34rem); */
  overflow: auto;

  .auditor {
    display: flex;
    align-items: center;

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: ${({ theme }) => theme.spacing(4)};
    }
  }
`;

const ProjectDetailsTile: FC<{
  projectDetails: IProject | null;
}> = ({ projectDetails }) => {
  const { isClientUser } = useAppContext();

  return (
    <StyledProjectDetailsTile>
      <div className='mb-4'>
        <Typography fontWeight='bold' component='h5'>
          Project Title
        </Typography>
        <Typography variant='subtitle1'>
          {projectDetails?.project_title}
        </Typography>
      </div>
      <div className='mb-4'>
        <Typography fontWeight='bold' component='h5'>
          Code Link
        </Typography>
        <a
          href={projectDetails?.code_link}
          target='_blank'
          className='block cursor-pointer underline'
        >
          <Typography variant='subtitle1'>Link to project</Typography>
        </a>
      </div>
      {projectDetails?.status &&
        ![
          IProjectStatus.AUDITOR_CONFIRMATION,
          IProjectStatus.AUDITOR_SELECTION,
        ].includes(projectDetails?.status) && (
          <>
            {isClientUser ? (
              <ClientProjectTile projectDetails={projectDetails} />
            ) : (
              <AuditorProjectTile projectDetails={projectDetails} />
            )}
          </>
        )}
    </StyledProjectDetailsTile>
  );
};

export default ProjectDetailsTile;
