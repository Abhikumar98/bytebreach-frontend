import React from 'react';

import Logo from '@/assets/logo.svg';

const AuthBranding = () => {
  return (
    <div className='flex flex-col items-center justify-center text-white'>
      <div className=' mb-4 h-20 w-20'>
        <Logo />
      </div>
      <div className=' text-2xl font-semibold'>ByteBreach</div>
    </div>
  );
};

export default AuthBranding;
