import { WALLET_ADAPTERS } from '@web3auth/base';
import {
  LOGIN_PROVIDER_TYPE,
  OpenloginLoginParams,
  OpenloginUserInfo,
} from '@web3auth/openlogin-adapter';
import React, { useState } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import Envelope from '@/assets/envelope.svg';
import Github from '@/assets/github-color.svg';
import Google from '@/assets/google.svg';
import Wallet from '@/assets/wallet.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

const AuditorAuth: React.FC<{
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

      // await web3auth.logout();

      setLoginLoaders((prev) => ({ ...prev, [authProvider]: true }));

      await web3auth.connectTo<OpenloginLoginParams>(
        WALLET_ADAPTERS.OPENLOGIN,
        { loginProvider: authProvider }
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
        icon={<Google />}
      >
        Login using your Google account
      </Button>
      <Button
        isLoading={loginLoaders['github']}
        disabled={disableButtons}
        onClick={() => handleAuthentication('github')}
        className='w-full'
        icon={<Github />}
      >
        Login using your Github account
      </Button>
      <Button
        isLoading={loginLoaders['webauthn']}
        disabled={disableButtons}
        onClick={() => handleAuthentication('webauthn')}
        className='w-full'
        icon={<Wallet />}
      >
        Login using your wallet
      </Button>
      <div className='bg-gray h-[1px] w-full' />
      <div>
        <Input
          label='Email'
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
          variant='primary'
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AuditorAuth;
