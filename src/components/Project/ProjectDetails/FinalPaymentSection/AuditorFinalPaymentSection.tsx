import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';

const AuditorFinalPaymentSection = () => {
  const {
    query: { projectId },
  } = useRouter();

  return (
    <ShadowCard>
      <Typography variant='h5'>Final Payment</Typography>

      <Typography>Waiting for Final Payment to complete</Typography>
    </ShadowCard>
  );
};

export default AuditorFinalPaymentSection;
