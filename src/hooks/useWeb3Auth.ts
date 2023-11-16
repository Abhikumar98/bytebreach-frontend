import { CHAIN_NAMESPACES } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';

import { defaultErrorMessage } from '@/lib/helper';

const useWeb3Auth = () => {
  const handleLogin = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID) {
        throw new Error(
          'Missing environment variable NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID'
        );
      }

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

      const metamaskAdapter = new MetamaskAdapter({
        clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
        sessionTime: 3600, // 1 hour in seconds
        web3AuthNetwork: 'sapphire_devnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x1',
          rpcTarget: 'https://rpc.ankr.com/eth', // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      });

      web3auth.configureAdapter(metamaskAdapter);

      await web3auth.init();

      if (web3auth.connected) {
        // const userInfo = await web3auth.getUserInfo();
        // setConnectedUserInfo(userInfo);

        // const userOnboarded = await isUserOnboarded(web3auth);

        // setIsOnboarded(!!userOnboarded);

        // setIsAuthenticated(!!userInfo);

        // if (userOnboarded) {
        //   const isAuthenticated = isAuthenticatedRoute(pathname);

        //   if (!isAuthenticated) {
        //     push('/');
        //   }
        // }

        // start from fresh connection upon init
        await web3auth.logout();
      }

      return web3auth;
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  return {
    handleLogin,
  };
};

export default useWeb3Auth;
