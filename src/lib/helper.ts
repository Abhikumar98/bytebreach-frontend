import { getPublicCompressed } from '@toruslabs/eccrypto';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import {
  LOGIN_PROVIDER_TYPE,
  OpenloginLoginParams,
  OpenloginUserInfo,
} from '@web3auth/openlogin-adapter';
import { Cookies } from 'react-cookie';
import { toast } from 'react-hot-toast';

import { login, mockResponse } from '@/services';

import { AppRoutes } from '@/types';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function setInLocalStorage(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const defaultErrorMessage = (error: any) => {
  toast.error(error.message);
  console.error(error);
};

export const isAuthenticatedRoute = (route: string) => {
  const authenticatedRoutes = [
    AppRoutes.EditPage,
    AppRoutes.ProjectDetails,
    AppRoutes.Homepage,
  ];

  const isCurrentAuthenticatedRoutes = authenticatedRoutes.some(
    (authenticatedRoute) => {
      return route.includes(authenticatedRoute);
    }
  );

  return isCurrentAuthenticatedRoutes;
};

export const COOKIES = {
  token: 'sessionid',
  csrfToken: 'csrftoken',
  browserCsrf: 'browser-csrf',
};

export const handleWeb3AuthLogin = async (
  clientType: 'client' | 'auditor',
  web3Auth: Web3AuthNoModal,
  adapter: string,
  authProvider: LOGIN_PROVIDER_TYPE,
  userEmail?: string
): Promise<{
  app_pub_key: string;
  is_show_onboarded: boolean;
}> => {
  let userInfo: Partial<OpenloginUserInfo>;
  let app_pub_key: string;

  if (!mockResponse) {
    await web3Auth.connectTo<OpenloginLoginParams>(adapter, {
      loginProvider: authProvider,
      extraLoginOptions: {
        login_hint: userEmail,
      },
    });

    const app_scoped_privkey = await web3Auth.provider?.request({
      method: 'eth_private_key', // use "private_key" for other non-evm chains
    });

    app_pub_key = getPublicCompressed(
      Buffer.from((app_scoped_privkey as any).padStart(64, '0'), 'hex')
    ).toString('hex');

    userInfo = await web3Auth.getUserInfo();
  } else {
    userInfo = {
      idToken: 'something',
    };

    app_pub_key = 'something';
  }

  try {
    const { is_onboarding_done: is_show_onboarded } = await login(
      userInfo.idToken ?? '',
      app_pub_key,
      clientType
    );

    // const csrfTokenCookieSettings = csrftoken.split(';').reduce(
    //   (acc, property) => {
    //     const [key, value] = property.split('=');

    //     return {
    //       ...acc,
    //       [key.trim()]: value,
    //     };
    //   },
    //   {
    //     csrftoken: '',
    //     expires: '',
    //     'Max-Age': '',
    //     Path: '',
    //     SameSite: '',
    //   }
    // );

    const cookie = new Cookies();
    // cookie.set(COOKIES.browserCsrf, csrfTokenCookieSettings.csrftoken, {
    //   // httpOnly: true,
    //   expires: new Date(csrfTokenCookieSettings.expires),
    //   maxAge: Number(csrfTokenCookieSettings['Max-Age']),
    //   path: csrfTokenCookieSettings.Path,
    // });

    if (mockResponse) {
      cookie.set(COOKIES.token, 'something');
      cookie.set(COOKIES.csrfToken, 'something');
    }

    return {
      app_pub_key,
      is_show_onboarded,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const unAuthenticatedRoutes = [
  AppRoutes.Login,
  AppRoutes.AuditorPage.replace('{auditorId}', '[profileId]'),
] as string[];

export const authenticatedRoutes = [
  AppRoutes.EditPage,
  AppRoutes.ProjectDetails.replace('{projectId}', '[projectId]'),
  AppRoutes.Homepage,
  AppRoutes.BugDetails.replace('{projectId}', '[projectId]').replace(
    '{bugId}',
    '[bugId]'
  ),
  AppRoutes.NewBug.replace('{projectId}', '[projectId]'),
];
