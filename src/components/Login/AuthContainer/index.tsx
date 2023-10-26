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
  const { userInfo, web3auth, updateUserInfo } = useAppContext();

  const [authUser, setAuthUser] = React.useState<UserType>('client');

  console.log({ userInfo });

  const [step, setStep] = React.useState<'login' | 'onboarding'>('login');

  const handleSuccessfulLogin = (userInfo: Partial<OpenloginUserInfo>) => {
    updateUserInfo(userInfo);
    setStep('onboarding');
  };

  const handleAuthUserUpdate = (user: UserType) => {
    setAuthUser(user);
  };

  useEffect(() => {
    if (!userInfo) {
      setStep('login');
    } else {
      handleSuccessfulLogin(userInfo);
    }
  }, [!!userInfo, web3auth?.connected]);

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
