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
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import {
  defaultErrorMessage,
  getFromLocalStorage,
  setInLocalStorage,
} from '@/lib/helper';

import { IAppContextState } from '@/types';

const AppContextState = createContext<IAppContextState | null>(null);

const AppContext: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [connectedUserInfo, setConnectedUserInfo] = useState<
    Partial<OpenloginUserInfo> | any
  >(null);

  const handleAuthenticationStatusUpdate = (authentication: boolean) => {
    setInLocalStorage('authenticated', authentication.toString());
    setIsAuthenticated(authentication);
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

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider: new EthereumPrivateKeyProvider({
          config: {
            chainConfig,
          },
        }),
        adapterSettings: {
          clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
          network: 'sapphire_devnet',
          uxMode: 'popup',
        },
      });
      web3auth.configureAdapter(openloginAdapter);

      const defaultWcSettings = await getWalletConnectV2Settings(
        'eip155',
        [1, 137, 5],
        'ee2e3f010161f953fff75354f09e5b93'
      );
      const walletConnectModal = new WalletConnectModal({
        projectId: 'ee2e3f010161f953fff75354f09e5b93',
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

      if (web3auth.connected) {
        const userInfo = await web3auth.getUserInfo();

        setConnectedUserInfo(userInfo);
      }

      setWeb3Auth(web3auth);
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
        userInfo: connectedUserInfo,
        updateUserInfo: setConnectedUserInfo,
        isAuthenticated,
        setIsAuthenticated: handleAuthenticationStatusUpdate,
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
