import { styled, Typography } from '@mui/material';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';

const StyledRecentEngagements = styled('div')`
  width: 100%;
  height: 20.5rem;
`;

const RecentEngagements = () => {
  return (
    <ShadowCard>
      <StyledRecentEngagements>
        <Typography component='h5' fontSize='1.5rem' fontWeight={500}>
          Recent engagements
        </Typography>
      </StyledRecentEngagements>
    </ShadowCard>
  );
};

export default RecentEngagements;
