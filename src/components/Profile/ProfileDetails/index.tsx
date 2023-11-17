import { SimplePaletteColorOptions, Typography } from '@mui/material';
import React from 'react';

import useTheme from '@/hooks/useTheme';

import AuditorProfile from '@/components/Profile/ProfileDetails/AuditorProfile';
import ClientProfile from '@/components/Profile/ProfileDetails/ClientProfile';

import ShadowCard from '@/atoms/ShadowCard';
import { useAppContext } from '@/context';

const ProfileDetails = () => {
  const theme = useTheme();

  const { isClientUser } = useAppContext();

  return (
    <ShadowCard>
      <Typography
        color={
          (theme.palette?.secondary as SimplePaletteColorOptions)?.contrastText
        }
        variant='h5'
        fontWeight={600}
      >
        Personal Information
      </Typography>
      <Typography>Edit your information below</Typography>
      {isClientUser ? <ClientProfile /> : <AuditorProfile />}
    </ShadowCard>
  );
};

export default ProfileDetails;
