import { Divider } from '@mui/material';
import { WALLET_ADAPTERS } from '@web3auth/base';
import {
  LOGIN_PROVIDER_TYPE,
  OpenloginUserInfo,
} from '@web3auth/openlogin-adapter';
import React, { useState } from 'react';

import { defaultErrorMessage, handleWeb3AuthLogin } from '@/lib/helper';

import Envelope from '@/assets/envelope.svg';
import Google from '@/assets/google.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

const ClientAuth: React.FC<{
  onLoginSuccess: (user: Partial<OpenloginUserInfo>) => void;
}> = ({ onLoginSuccess }) => {
  const { web3auth } = useAppContext();
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

      const adapter = WALLET_ADAPTERS.OPENLOGIN;

      await handleWeb3AuthLogin(
        'client',
        web3auth,
        adapter,
        authProvider,
        userEmail
      );

      const userInfo = await web3auth.getUserInfo();

      onLoginSuccess(userInfo);
    } catch (error) {
      defaultErrorMessage(error);
    } finally {
      setLoginLoaders((prev) => ({ ...prev, [authProvider]: false }));
    }
  };

  const disableButtons = Object.values(loginLoaders).some((loader) => loader);

  return (
    <div className=' space-y-6'>
      <Button
        isLoading={loginLoaders['google']}
        disabled={disableButtons}
        className='w-full'
        onClick={() => handleAuthentication('google')}
        startIcon={<Google />}
        color='secondary'
      >
        Login using your Google account
      </Button>

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
          isLoading={loginLoaders['email_passwordless']}
          disabled={disableButtons}
          onClick={() => handleAuthentication('email_passwordless')}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ClientAuth;
