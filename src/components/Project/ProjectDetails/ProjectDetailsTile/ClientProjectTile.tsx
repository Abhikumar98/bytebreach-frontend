import { Typography, useTheme } from '@mui/material';
import React, { FC, useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import { getAuditorStatus } from '@/services';

import { IAuditorStatusResponse, IProject } from '@/types';

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
  }, [projectDetails?.state, projectDetails?.project_id]);

  const totalCost = auditors.reduce((acc, curr) => {
    return acc + curr.quotation_cost;
  }, 0);

  const platformFee = totalCost * 0.1;

  return (
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
        <div className='space-y-4'>
          {auditors.map((auditor) => (
            <div key={auditor.auditor_id} className='auditor'>
              <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
              <div className='auditor-details-container'>
                <Typography component='h5' fontWeight='medium'>
                  {auditor.first_name} {auditor.last_name}
                </Typography>
                <Typography fontSize='0.75rem' fontWeight='7hin'>
                  Auditor
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsTile;
