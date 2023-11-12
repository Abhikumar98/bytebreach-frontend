import { styled, Typography } from '@mui/material';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';

const StyledAuditorWork = styled('div')`
  width: 100%;
  height: 18rem;
`;

const AuditorWork = () => {
  return (
    <ShadowCard>
      <StyledAuditorWork>
        <Typography component='h5' fontSize='1.5rem' fontWeight={500}>
          Worked with
        </Typography>
      </StyledAuditorWork>
    </ShadowCard>
  );
};

export default AuditorWork;
