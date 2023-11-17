import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { Cookies } from 'react-cookie';

import {
  authenticatedRoutes,
  COOKIES,
  defaultErrorMessage,
} from '@/lib/helper';

import { useAppContext } from '@/context';

import { AppRoutes } from '@/types';

const AuthWrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { pathname, push } = useRouter();
  const { handleFetchUser, userInfo } = useAppContext();

  const cookie = new Cookies();

  const validateAuthentication = async () => {
    const cookies = cookie.getAll();

    if (cookies[COOKIES.csrfToken] && cookies[COOKIES.token]) {
      if (!authenticatedRoutes.includes(pathname)) {
        push(AppRoutes.Homepage);
      }

      return true;
    }

    return false;
  };

  const validateAuthenticationAndRedirect = async () => {
    const isAuthenticated = validateAuthentication();

    if (!isAuthenticated) {
      push(AppRoutes.Login);
    }

    try {
      if (!userInfo?.first_name) {
        // remove the argument
        await handleFetchUser('client');
      }
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    if (pathname === AppRoutes.Login) {
      validateAuthentication();
    } else if (authenticatedRoutes.includes(pathname)) {
      validateAuthenticationAndRedirect();
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AuthWrapper;
