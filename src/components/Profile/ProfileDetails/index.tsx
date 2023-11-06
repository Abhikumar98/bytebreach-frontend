import { SimplePaletteColorOptions, Typography } from '@mui/material';
import React from 'react';

import useTheme from '@/hooks/useTheme';

import InlineEdit from '@/components/Profile/ProfileDetails/InlineEdit';

import Button from '@/atoms/Button';
import ShadowCard from '@/atoms/ShadowCard';

const ProfileDetails = () => {
  const theme = useTheme();

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
      <div className='mb-6 mt-4 flex w-full gap-4'>
        <InlineEdit
          label='Full name'
          value='Test'
          onSave={(value) => console.log({ value })}
        />
        <InlineEdit
          label='Company name'
          value='Test'
          onSave={(value) => console.log({ value })}
        />
      </div>
      <div className='mb-6 flex w-full gap-4'>
        <InlineEdit
          label='Your website'
          value='Test'
          onSave={(value) => console.log({ value })}
        />
        <InlineEdit
          label='Twitter'
          value='Test'
          onSave={(value) => console.log({ value })}
        />
      </div>
      <div className='mb-6 flex w-full gap-4'>
        <InlineEdit
          label='Company Github'
          value='Test'
          onSave={(value) => console.log({ value })}
        />
        <InlineEdit
          label='Email ID'
          value='Test'
          onSave={(value) => console.log({ value })}
        />
      </div>
      <div className='mt-8 flex items-center justify-end space-x-4'>
        <Button variant='outlined'>Cancel</Button>
        <Button>Submit</Button>
      </div>
    </ShadowCard>
  );
};

export default ProfileDetails;
