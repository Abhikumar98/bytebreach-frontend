import { styled, Typography } from '@mui/material';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';

const StyledProfileHeader = styled('div')`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  height: 23rem;

  .graphic-container {
    border-radius: 2rem;
    overflow: hidden;
    height: 8rem;

    .background-graphic {
      background: url('/images/background-graphic.png');
      background-size: cover;
      background-repeat: no-repeat;
      height: 100%;
    }
  }

  .profile-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -3rem;
    height: 10rem;
    .profile-image {
      img {
        height: 6rem;
        width: 6rem;
        border-radius: 50%;
        border: 4px solid;
        border-color: ${({ theme }) => theme.palette.background.default};
      }
    }
  }
`;

const ProfileHeader = () => {
  return (
    <StyledProfileHeader>
      <ShadowCard>
        <div className='graphic-container'>
          <div className='background-graphic' />
        </div>
        <div className='profile-details space-y-2'>
          <div className='profile-image mb-0'>
            <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
          </div>
          <div className='title'>
            <Typography variant='h6'>Tabish</Typography>
          </div>
          <div className='org'>Bytebreach</div>
          <div className='profile-type'>Auditor</div>
        </div>
      </ShadowCard>
    </StyledProfileHeader>
  );
};

export default ProfileHeader;
