import classNames from 'classnames';
import React from 'react';

import AuditorAuth from '@/components/Login/AuditorAuth';
import AuthNavbar from '@/components/Login/AuthContainer/AuthNavbar';
import ClientAuth from '@/components/Login/ClientAuth';
import AuditorOnboarding from '@/components/Login/Onboarding/AuditorOnboarding';
import ClientOnboarding from '@/components/Login/Onboarding/ClientOnboarding';

import { useAppContext } from '@/context';

import { UserType } from '@/types';

const AuthContainer = () => {
  const { handleLogout } = useAppContext();

  const [authUser, setAuthUser] = React.useState<UserType>('client');
  const [step, setStep] = React.useState<'login' | 'onboarding'>('login');

  const handleSuccessfulLogin = async (userType: UserType) => {
    setStep('onboarding');
    setAuthUser(userType);
  };

  const handleAuthUserUpdate = (user: UserType) => {
    setAuthUser(user);
  };

  const handleBackToLogin = async () => {
    await handleLogout();
    setStep('login');
  };

  return (
    <div className='overflow-hidden rounded-3xl'>
      {step === 'login' && (
        <AuthNavbar
          authUser={authUser}
          handleAuthUserUpdate={handleAuthUserUpdate}
        />
      )}
      <div
        className={classNames(
          'px-8 py-6',
          step === 'login' ? 'bg-gray' : 'bg-white'
        )}
      >
        {authUser === 'client' ? (
          <>
            {step === 'login' ? (
              <ClientAuth onLoginSuccess={handleSuccessfulLogin} />
            ) : (
              <ClientOnboarding backToLogin={() => handleBackToLogin()} />
            )}
          </>
        ) : (
          <>
            {step === 'login' ? (
              <AuditorAuth onLoginSuccess={handleSuccessfulLogin} />
            ) : (
              <AuditorOnboarding backToLogin={() => handleBackToLogin()} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
