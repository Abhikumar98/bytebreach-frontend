import React from 'react';

import AuthBranding from '@/components/Login/AuthBranding';
import AuthContainer from '@/components/Login/AuthContainer';

import InnerGradient from '@/assets/inner-gradient.svg';
import OuterGradient from '@/assets/outer-gradient.svg';

const Auth = () => {
  return (
    <>
      {/* <div className='secondary-background-gradient fixed z-[2] m-0 h-full w-full' /> */}
      <div className='absolute -top-36 h-screen w-screen'>
        <OuterGradient />
      </div>
      <div className='absolute -top-[5rem] h-screen w-screen'>
        <InnerGradient />
      </div>
      <div className='login-page flex h-screen w-screen flex-col items-center justify-center space-y-8'>
        <div className='z-[5]'>
          <AuthBranding />
          <AuthContainer />
        </div>
      </div>
    </>
  );
};

export default Auth;
