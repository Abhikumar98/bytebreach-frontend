import { styled, Typography, useTheme } from '@mui/material';
import React, { FC, useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import { getAuditorStatus } from '@/services';

import { IAuditorStatusResponse, IProject, IProjectStatus } from '@/types';

const StyledProjectDetailsTile = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[2]};
  padding: ${({ theme }) => theme.spacing(8)};
  border-radius: 1rem;
  background: ${({ theme }) => theme.palette.background.default};

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
  const theme = useTheme();

  const [auditors, setAuditors] = React.useState<IAuditorStatusResponse[]>([]);

  const handleFetchAuditorStatus = async () => {
    try {
      if (!projectDetails?.project_id) return;

      const response = await getAuditorStatus(projectDetails?.project_id);

      setAuditors(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    handleFetchAuditorStatus();
  }, [projectDetails?.status, projectDetails?.project_id]);

  const totalCost = auditors.reduce((acc, curr) => {
    return acc + curr.quotation_cost;
  }, 0);

  const platformFee = totalCost * 0.1;

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
        <Typography variant='subtitle1'>{projectDetails?.code_link}</Typography>
      </div>
      {projectDetails?.status !== IProjectStatus.AUDITOR_CONFIRMATION ? (
        <>
          <div className='mb-4'>
            <Typography fontWeight='bold' component='h5'>
              Audit breakup
            </Typography>
            <div className='flex items-center space-x-4'>
              <Typography variant='subtitle1'>Total audit time:</Typography>
              <Typography variant='subtitle1'>5 weeks</Typography>
            </div>
            <div className='flex items-center space-x-4'>
              <Typography
                sx={{
                  color: theme.palette.text.disabled,
                  width: '7rem',
                }}
                variant='subtitle2'
              >
                Audit fee:
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.text.disabled,
                }}
                variant='subtitle2'
              >
                $ {totalCost}
              </Typography>
            </div>
            <div className='flex items-center space-x-4'>
              <Typography
                sx={{
                  color: theme.palette.text.disabled,
                  width: '7rem',
                }}
                variant='subtitle2'
              >
                Platform fee:
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.text.disabled,
                }}
                variant='subtitle2'
              >
                $ {platformFee}
              </Typography>
            </div>
            <div className='flex items-center space-x-4'>
              <Typography
                variant='subtitle1'
                sx={{
                  width: '7rem',
                }}
              >
                Total cost:
              </Typography>
              <Typography variant='subtitle1'>
                $ {platformFee + totalCost}
              </Typography>
            </div>
          </div>
          <div className='mb-4'>
            <Typography
              fontWeight='bold'
              component='h5'
              sx={{
                marginBottom: theme.spacing?.(2),
              }}
            >
              Auditors
            </Typography>
            <div className='auditor'>
              <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
              <div className='auditor-details-container'>
                <Typography component='h5' fontWeight='medium'>
                  Auditor name
                </Typography>
                <Typography fontSize='0.75rem' fontWeight='7hin'>
                  Auditor
                </Typography>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </StyledProjectDetailsTile>
  );
};

export default ProjectDetailsTile;
