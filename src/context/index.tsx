import { WalletConnectModal } from '@walletconnect/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import {
  OpenloginAdapter,
  OpenloginUserInfo,
} from '@web3auth/openlogin-adapter';
import {
  getWalletConnectV2Settings,
  WalletConnectV2Adapter,
} from '@web3auth/wallet-connect-v2-adapter';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Web3 from 'web3';

import {
  defaultErrorMessage,
  getFromLocalStorage,
  setInLocalStorage,
} from '@/lib/helper';

import { IAppContextState } from '@/types';

const AppContextState = createContext<IAppContextState | null>(null);

export const isUserOnboarded = async (web3Auth: Web3AuthNoModal | null) => {
  if (!web3Auth) {
    return null;
  }

  const web3 = new Web3(web3Auth.provider as any);
  const accounts = await web3.eth.getAccounts();
  console.log({ accounts });

  const onboardedUsers = getFromLocalStorage('onboarded')
    ? JSON.parse(getFromLocalStorage('onboarded') ?? '')
    : {};

  return onboardedUsers[accounts?.[0] ?? ''];
};

const AppContext: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [connectedUserInfo, setConnectedUserInfo] = useState<
    (Partial<OpenloginUserInfo> & { account?: string }) | any
  >(null);

  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      await web3auth?.logout();
      setConnectedUserInfo(null);
      setIsAuthenticated(false);
      push('/login');
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  const handleAuthenticationStatusUpdate = (authentication: boolean) => {
    console.trace('handleAuthenticationStatusUpdate', authentication);
    setInLocalStorage('authenticated', authentication.toString());
    setIsAuthenticated(authentication);
  };

  const handleOnboardedUser = (address: string) => {
    const onboardedUsers = getFromLocalStorage('onboarded')
      ? JSON.parse(getFromLocalStorage('onboarded') ?? '')
      : {};

    onboardedUsers[address] = true;

    setInLocalStorage('onboarded', JSON.stringify(onboardedUsers));
    setIsOnboarded(true);
    setIsAuthenticated(true);
  };

  const initialiseWeb3Auth = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID) {
        throw new Error(
          'Missing environment variable NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID'
        );
      }

      const authenticationStatus =
        getFromLocalStorage('authenticated') === 'true';

      handleAuthenticationStatusUpdate(authenticationStatus);

      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: '0x1',
        rpcTarget: 'https://rpc.ankr.com/eth',
        displayName: 'Ethereum Mainnet',
        blockExplorer: 'https://goerli.etherscan.io',
        ticker: 'ETH',
        tickerName: 'Ethereum',
      };
      const web3auth = new Web3AuthNoModal({
        clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
        chainConfig,
        web3AuthNetwork: 'sapphire_devnet',
      });

      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
      });
      web3auth.configureAdapter(openloginAdapter);

      // adding wallet connect v2 adapter
      const defaultWcSettings = await getWalletConnectV2Settings(
        'eip155',
        [1, 137, 5],
        '04309ed1007e77d1f119b85205bb779d'
      );
      const walletConnectModal = new WalletConnectModal({
        projectId: '04309ed1007e77d1f119b85205bb779d',
      });
      const walletConnectV2Adapter = new WalletConnectV2Adapter({
        adapterSettings: {
          qrcodeModal: walletConnectModal,
          ...defaultWcSettings.adapterSettings,
        },
        loginSettings: { ...defaultWcSettings.loginSettings },
      });

      web3auth.configureAdapter(walletConnectV2Adapter);

      await web3auth.init();
      setWeb3Auth(web3auth);

      if (web3auth.connected) {
        const userInfo = await web3auth.getUserInfo();
        setConnectedUserInfo(userInfo);

        const userOnboarded = await isUserOnboarded(web3auth);

        setIsOnboarded(userOnboarded);
        setIsAuthenticated(!!userInfo);
        push('/');
      }
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    initialiseWeb3Auth();
  }, []);

  return (
    <AppContextState.Provider
      value={{
        web3auth,
        handleLogout,
        handleOnboardedUser,
        userInfo: connectedUserInfo,
        updateUserInfo: setConnectedUserInfo,
        isAuthenticated,
        setIsAuthenticated: handleAuthenticationStatusUpdate,
        isOnboarded,
        setIsOnboarded,
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
