import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

import { getFromLocalStorage } from '@/lib/helper';

import AppContext from '@/context';

const Layout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = getFromLocalStorage('authenticated');

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return <AppContext>{children}</AppContext>;
};

export default Layout;
