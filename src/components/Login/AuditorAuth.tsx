import { Divider } from '@mui/material';
import { WALLET_ADAPTERS } from '@web3auth/base';
import { LOGIN_PROVIDER_TYPE } from '@web3auth/openlogin-adapter';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { defaultErrorMessage, handleWeb3AuthLogin } from '@/lib/helper';

import Envelope from '@/assets/envelope.svg';
import Github from '@/assets/github-color.svg';
import Google from '@/assets/google.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

import { AppRoutes, UserType } from '@/types';

const AuditorAuth: React.FC<{
  onLoginSuccess: (user: UserType) => void;
}> = ({ onLoginSuccess }) => {
  const { web3auth, handleLogout } = useAppContext();

  const { push } = useRouter();

  const [loginLoaders, setLoginLoaders] = useState<
    Partial<Record<LOGIN_PROVIDER_TYPE, boolean>>
  >({
    email_passwordless: false,
    github: false,
    google: false,
    webauthn: false,
  });
  const [userEmail, setUserEmail] = useState<string>('');

  const handleAuthentication = async (authProvider: LOGIN_PROVIDER_TYPE) => {
    try {
      if (!web3auth) {
        throw new Error('Web3Auth not initialised');
      }

      if (authProvider === 'email_passwordless' && !userEmail) {
        throw new Error('Email is required');
      }

      setLoginLoaders((prev) => ({ ...prev, [authProvider]: true }));

      const adapter =
        authProvider === 'webauthn'
          ? WALLET_ADAPTERS.METAMASK
          : WALLET_ADAPTERS.OPENLOGIN;

      const { is_show_onboarded } = await handleWeb3AuthLogin(
        'auditor',
        web3auth,
        adapter,
        authProvider,
        userEmail
      );

      if (is_show_onboarded) {
        push(AppRoutes.Homepage);
      }

      onLoginSuccess('auditor');
    } catch (error) {
      defaultErrorMessage(error);
      await handleLogout();
    } finally {
      setLoginLoaders((prev) => ({ ...prev, [authProvider]: false }));
    }
  };

  const disableButtons = Object.values(loginLoaders).some((loader) => loader);

  return (
    <div className=' space-y-6'>
      <Button
        isLoading={loginLoaders['google'] || !web3auth}
        disabled={disableButtons}
        className='w-full'
        onClick={() => handleAuthentication('google')}
        startIcon={<Google />}
        color='secondary'
      >
        Login using your Google account
      </Button>
      <Button
        isLoading={loginLoaders['github'] || !web3auth}
        disabled={disableButtons}
        onClick={() => handleAuthentication('github')}
        className='w-full'
        startIcon={<Github />}
        color='secondary'
      >
        Login using your Github account
      </Button>
      {/* <Button
        isLoading={loginLoaders['webauthn']}
        disabled={disableButtons}
        onClick={() => handleAuthentication('webauthn')}
        className='w-full'
        startIcon={<Wallet />}
        color='secondary'
      >
        Login using your wallet
      </Button> */}
      <Divider />
      <div>
        <Input
          label='Email'
          id='email'
          onChange={(e) => setUserEmail(e.target.value)}
          disabled={disableButtons}
          value={userEmail}
          placeholder='john@doe.com'
          icon={<Envelope />}
        />
      </div>

      <div className='flex justify-center'>
        <Button
          isLoading={loginLoaders['email_passwordless'] || !web3auth}
          disabled={disableButtons}
          onClick={() => handleAuthentication('email_passwordless')}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AuditorAuth;
