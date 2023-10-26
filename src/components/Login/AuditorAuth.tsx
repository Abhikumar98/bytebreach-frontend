import React from 'react';

import Envelope from '@/assets/envelope.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';

const AuditorAuth = () => {
  return (
    <div className=' space-y-6'>
      <Button className='w-full'>Login using your Google account</Button>
      <Button className='w-full'>Login using your Github account</Button>
      <Button className='w-full'>Login using your wallet</Button>
      <div className='h-[1px] w-full bg-gray-400' />
      <div>
        <div className='text-lg font-semibold'>Email</div>
        <Input placeholder='john@doe.com' icon={<Envelope />} />
      </div>

      <div className='flex justify-center'>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default AuditorAuth;
