import { styled } from '@mui/material';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';

const StyledProfileHeader = styled('div')`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const ProfileHeader = () => {
  return (
    <StyledProfileHeader>
      <ShadowCard>
        <div className='background-graphic' />
      </ShadowCard>
    </StyledProfileHeader>
  );
};

export default ProfileHeader;
