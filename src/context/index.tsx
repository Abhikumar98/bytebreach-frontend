import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  getEvmChainConfig,
} from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import {
  OpenloginAdapter,
  OpenloginUserInfo,
} from '@web3auth/openlogin-adapter';
import { WalletConnectV2Adapter } from '@web3auth/wallet-connect-v2-adapter';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { IAppContextState } from '@/types';

const AppContextState = createContext<IAppContextState | null>(null);

const AppContext: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [connectedUserInfo, setConnectedUserInfo] = useState<
    Partial<OpenloginUserInfo> | any
  >(null);

  const initialiseWeb3Auth = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID) {
        throw new Error(
          'Missing environment variable NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID'
        );
      }

      const web3auth = new Web3AuthNoModal({
        clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
        },
        web3AuthNetwork: 'cyan',
      });

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider: new EthereumPrivateKeyProvider({
          config: {
            chainConfig: getEvmChainConfig(1) as CustomChainConfig,
          },
        }),
        adapterSettings: {
          clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
          network: 'sapphire_devnet',
          uxMode: 'popup',
        },
      });
      web3auth.configureAdapter(openloginAdapter);
      const adapter = new WalletConnectV2Adapter({
        adapterSettings: {
          walletConnectInitOptions: {
            projectId: 'ee2e3f010161f953fff75354f09e5b93',
          },
        },
      });
      web3auth.configureAdapter(adapter);

      await web3auth.init();

      if (web3auth.connected) {
        const userInfo = await web3auth.getUserInfo();

        setConnectedUserInfo(userInfo);
      }

      setWeb3Auth(web3auth);
    } catch (error) {
      console.error(error);
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
