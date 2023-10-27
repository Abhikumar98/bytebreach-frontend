import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import DashboardLayout from '@/components/Dashboard/DashboardLayout';

import { useAppContext } from '@/context';

const Wrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { userInfo, isAuthenticated } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !userInfo) {
      router.push('/login');
    }
  }, []);

  console.log(userInfo && isAuthenticated);

  return (
    <div className=' font-sans'>
      {userInfo && isAuthenticated ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <>{children}</>
      )}
      <Toaster />
    </div>
  );
};

export default Wrapper;
