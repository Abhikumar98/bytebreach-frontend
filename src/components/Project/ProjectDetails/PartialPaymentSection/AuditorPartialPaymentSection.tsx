import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';

const AuditorPartialPaymentSection = () => {
  const {
    query: { projectId },
  } = useRouter();

  return (
    <ShadowCard>
      <Typography variant='h5'>Partial Payment</Typography>
    </ShadowCard>
  );
};

export default AuditorPartialPaymentSection;
