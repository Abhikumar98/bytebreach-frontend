import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';
import classNames from 'classnames';
import React, { useEffect } from 'react';

import AuditorAuth from '@/components/Login/AuditorAuth';
import AuthNavbar from '@/components/Login/AuthContainer/AuthNavbar';
import ClientAuth from '@/components/Login/ClientAuth';
import AuditorOnboarding from '@/components/Login/Onboarding/AuditorOnboarding';
import ClientOnboarding from '@/components/Login/Onboarding/ClientOnboarding';

import { useAppContext } from '@/context';

import { UserType } from '@/types';

const AuthContainer = () => {
  const { userInfo, web3auth } = useAppContext();

  const [authUser, setAuthUser] = React.useState<UserType>('client');

  const [currentUserInfo, setCurrentUserInfo] =
    React.useState<Partial<OpenloginUserInfo> | null>(null);

  console.log({ currentUserInfo });

  const [step, setStep] = React.useState<'login' | 'onboaring'>('login');

  const handleSuccessfulLogin = (userInfo: Partial<OpenloginUserInfo>) => {
    setCurrentUserInfo(userInfo);
    setStep('onboaring');
  };

  const handleAuthUserUpdate = (user: UserType) => {
    setAuthUser(user);
  };

  useEffect(() => {
    if (userInfo?.email && userInfo?.idToken) {
      handleSuccessfulLogin(userInfo);
    }
  }, [userInfo?.email, web3auth?.connected]);

  return (
    <div className=' w-[41rem] overflow-hidden rounded-3xl'>
      {step === 'login' && (
        <AuthNavbar
          authUser={authUser}
          handleAuthUserUpdate={handleAuthUserUpdate}
        />
      )}
      <div
        className={classNames(
          'h-full px-8 py-6',
          step === 'login' ? 'bg-gray-200' : 'bg-white'
        )}
      >
        {authUser === 'client' ? (
          <>
            {step === 'login' ? (
              <ClientAuth onLoginSuccess={handleSuccessfulLogin} />
            ) : (
              <ClientOnboarding />
            )}
          </>
        ) : (
          <>
            {step === 'login' ? (
              <AuditorAuth onLoginSuccess={handleSuccessfulLogin} />
            ) : (
              <AuditorOnboarding />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
