import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

import { getFromLocalStorage } from '@/lib/helper';

import DashboardLayout from '@/components/Dashboard/DashboardLayout';

import { useAppContext } from '@/context';

const Wrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { userInfo } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = getFromLocalStorage('authenticated');

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return (
    <div className=' font-sans'>
      {userInfo ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Wrapper;
