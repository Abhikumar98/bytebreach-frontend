import React from 'react';

import AuthBranding from '@/components/Login/AuthBranding';
import AuthContainer from '@/components/Login/AuthContainer';

const Auth = () => {
  return (
    <div className='login-page flex h-screen w-screen flex-col items-center justify-center space-y-8'>
      <AuthBranding />
      <AuthContainer />
    </div>
  );
};

export default Auth;
