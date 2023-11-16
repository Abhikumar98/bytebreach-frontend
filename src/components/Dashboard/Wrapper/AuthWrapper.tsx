import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { Cookies } from 'react-cookie';

import { authenticatedRoutes, COOKIES } from '@/lib/helper';

import { AppRoutes } from '@/types';

const AuthWrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { pathname, push } = useRouter();

  console.log('🚀 ~ file: AuthWrapper.tsx:13 ~ pathname:', pathname);

  const cookie = new Cookies();

  const validateAuthentication = () => {
    const cookies = cookie.getAll();

    console.log(authenticatedRoutes.includes(pathname));

    if (cookies[COOKIES.csrfToken] && cookies[COOKIES.token]) {
      if (!authenticatedRoutes.includes(pathname)) {
        console.log('Authenticated user');
        push(AppRoutes.Homepage);
      }

      return true;
    }

    return false;
  };

  const validateAuthenticationAndRedirect = () => {
    const isAuthenticated = validateAuthentication();

    console.log({ isAuthenticated });

    if (!isAuthenticated) {
      console.log(
        'Unauthenticated user, redirecting to login',
        isAuthenticated
      );
      push(AppRoutes.Login);
    }
  };

  useEffect(() => {
    if (pathname === AppRoutes.Login) {
      console.log('Login path');
      validateAuthentication();
    } else if (authenticatedRoutes.includes(pathname)) {
      console.log('should be authenticated path');
      validateAuthenticationAndRedirect();
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AuthWrapper;
