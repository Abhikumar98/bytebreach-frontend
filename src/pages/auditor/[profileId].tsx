import { Color, styled, Typography } from '@mui/material';
import React from 'react';

import AuditorWork from '@/components/Profile/AuditorProfile/AuditorWork';
import RecentEngagements from '@/components/Profile/AuditorProfile/RecentEngagements';
import ProfileHeader from '@/components/Profile/ProfileHeader';

import Logo from '@/assets/logo.svg';

const StyledAuditorProfileLayout = styled('div')`
  width: calc(100vw - 3rem);
  height: calc(100vh - 3rem);
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(6)};

  .header-container {
    display: flex;
    width: 100%;
    gap: 2rem;
  }

  .logo {
    padding: ${({ theme }) => theme.spacing(2)};
    margin: 1rem 0;
    display: flex;
    align-items: center;
    color: ${({ theme }) => (theme.palette.secondary as Partial<Color>)[800]};
  }
  & .logo svg {
    height: 64px;
    width: 56px;
  }
`;

const AuditorProfile = () => {
  return (
    <StyledAuditorProfileLayout>
      <div className='logo'>
        <Logo />
        <Typography variant='h5'>Bytebreach</Typography>
      </div>
      <div className='header-container'>
        <div className='w-3/5'>
          <ProfileHeader />
        </div>
        <div className='w-2/5'>
          <AuditorWork />
        </div>
      </div>

      <div>
        <RecentEngagements />
      </div>
    </StyledAuditorProfileLayout>
  );
};

export default AuditorProfile;
