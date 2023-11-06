import React from 'react';

import BugDetails from '@/components/Project/Bug/BugDetails';

import PageHeader from '@/atoms/PageHeader';

const BugDetailsPage = () => {
  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <BugDetails />
    </div>
  );
};

export default BugDetailsPage;
