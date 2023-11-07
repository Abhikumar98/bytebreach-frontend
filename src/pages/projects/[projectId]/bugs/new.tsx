import React from 'react';

import CreateBugForm from '@/components/Project/Bug/CreateBugForm';

import PageHeader from '@/atoms/PageHeader';

const CreateBug = () => {
  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <CreateBugForm />
    </div>
  );
};

export default CreateBug;
