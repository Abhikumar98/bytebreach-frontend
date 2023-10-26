import { WALLET_ADAPTERS } from '@web3auth/base';
import {
  LOGIN_PROVIDER_TYPE,
  OpenloginLoginParams,
} from '@web3auth/openlogin-adapter';
import React, { useState } from 'react';

import Envelope from '@/assets/envelope.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

import { AuthOptions } from '@/types';

const ClientAuth = () => {
  const { web3auth } = useAppContext();
  const [loginLoaders, setLoginLoaders] = useState<
    Record<AuthOptions, boolean>
  >({
    email: false,
    github: false,
    google: false,
    wallet: false,
  });

  const handleAuthentication =
    (authLoader: AuthOptions) => async (authProvider: LOGIN_PROVIDER_TYPE) => {
      try {
        if (!web3auth) {
          throw new Error('Web3Auth not initialised');
        }

        setLoginLoaders((prev) => ({ ...prev, [authLoader]: true }));

        const web3authProvider = await web3auth.connectTo<OpenloginLoginParams>(
          WALLET_ADAPTERS.OPENLOGIN,
          { loginProvider: authProvider }
        );

        const userInfo = await web3auth.getUserInfo();

        console.log({ userInfo });
      } catch (error) {
        console.error(error);
      } finally {
        setLoginLoaders((prev) => ({ ...prev, [authLoader]: false }));
      }
    };

  return (
    <div className=' space-y-6'>
      <Button
        className='w-full'
        onClick={() => handleAuthentication('google')('google')}
      >
        Login using your Google account
      </Button>
      <Button
        onClick={() => handleAuthentication('github')('github')}
        className='w-full'
      >
        Login using your Github account
      </Button>
      <Button
        onClick={() => handleAuthentication('wallet')('webauthn')}
        className='w-full'
      >
        Login using your wallet
      </Button>
      <div className='h-[1px] w-full bg-gray-400' />
      <div>
        <div className='text-lg font-semibold'>Email</div>
        <Input placeholder='john@doe.com' icon={<Envelope />} />
      </div>

      <div className='flex justify-center'>
        <Button
          onClick={() => handleAuthentication('email')('email_passwordless')}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ClientAuth;
