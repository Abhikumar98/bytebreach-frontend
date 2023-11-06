import React from 'react';

import ProfileDetails from '@/components/Profile/ProfileDetails';
import ProfileHeader from '@/components/Profile/ProfileHeader';

import PageHeader from '@/atoms/PageHeader';

const EditProfile = () => {
  return (
    <div className='h-full w-full'>
      <PageHeader title='Edit Profile' />
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};

export default EditProfile;
