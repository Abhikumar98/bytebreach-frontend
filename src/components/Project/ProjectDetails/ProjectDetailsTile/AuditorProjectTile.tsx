import { Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import { getCurrentProjectAuditorStatus } from '@/services';

import { IAuditorStatusResponse, IProject } from '@/types';

const AuditorProjectTile: FC<{
  projectDetails: IProject | null;
}> = ({ projectDetails }) => {
  const [auditor, setAuditor] = React.useState<IAuditorStatusResponse | null>(
    null
  );

  const handleFetchAuditorStatus = async () => {
    try {
      if (!projectDetails?.project_id) return;

      const response = await getCurrentProjectAuditorStatus(
        projectDetails?.project_id
      );

      setAuditor(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    handleFetchAuditorStatus();
  }, [projectDetails?.status, projectDetails?.project_id]);

  return (
    <>
      <div className='mb-4'>
        <Typography fontWeight='bold' component='h5'>
          Audit breakup
        </Typography>
        <div className='flex items-center space-x-4'>
          <Typography variant='subtitle1'>Total cost:</Typography>
          <Typography variant='subtitle1'>
            $ {auditor?.quotation_cost}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default AuditorProjectTile;
