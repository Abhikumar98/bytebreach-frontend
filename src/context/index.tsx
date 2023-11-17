import { Web3AuthNoModal } from '@web3auth/no-modal';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

import { COOKIES, defaultErrorMessage } from '@/lib/helper';
import useWeb3Auth from '@/hooks/useWeb3Auth';

import { getAuditorProfile, getClientProfile } from '@/services';

import {
  AppRoutes,
  IAppContextState,
  IAuditorProfile,
  IUserProfile,
  UserType,
} from '@/types';

const AppContextState = createContext<IAppContextState | null>(null);

const AppContext: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [connectedUserInfo, setConnectedUserInfo] = useState<
    IAuditorProfile | IUserProfile | null
  >(null);
  const [isClientUser, setIsClientUser] = useState<boolean>(true);

  const cookie = new Cookies();

  const { handleLogin } = useWeb3Auth();

  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      if (web3auth && web3auth.connected) {
        await web3auth?.logout();
      }

      cookie.remove(COOKIES.csrfToken);
      cookie.remove(COOKIES.token);
      setConnectedUserInfo(null);

      push(AppRoutes.Login);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  const initLogin = async () => {
    const web3AuthInstance = await handleLogin();

    if (web3AuthInstance) {
      setWeb3Auth(web3AuthInstance);
    }
  };

  const handleFetchUser = async (type?: UserType) => {
    try {
      if (type === 'client') {
        const response = await getClientProfile();
        setConnectedUserInfo(response);
        setIsClientUser(true);
        return;
      }

      if (type === 'auditor') {
        const response = await getAuditorProfile();
        setConnectedUserInfo(response);
        setIsClientUser(false);
        return;
      }

      try {
        const response = await getClientProfile();

        setConnectedUserInfo(response);
        setIsClientUser(true);
      } catch (error) {
        const response = await getAuditorProfile();

        setConnectedUserInfo(response);
        setIsClientUser(false);
      }
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    initLogin();
  }, []);

  return (
    <AppContextState.Provider
      value={{
        isClientUser,
        web3auth,
        handleLogout,
        userInfo: connectedUserInfo,
        handleFetchUser,
      }}
    >
      {children}
    </AppContextState.Provider>
  );
};

export const useAppContext = (): IAppContextState => {
  const context = React.useContext(AppContextState);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContext');
  }
  return context;
};

export default AppContext;
