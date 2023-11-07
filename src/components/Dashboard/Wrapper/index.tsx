import { Container, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import theme from '@/lib/styles';

import DashboardLayout from '@/components/Dashboard/DashboardLayout';

import { useAppContext } from '@/context';

const Wrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { userInfo, isAuthenticated, isOnboarded, web3auth } = useAppContext();

  const router = useRouter();
  const showDashboard = true || (userInfo && isAuthenticated && isOnboarded);

  console.log({ showDashboard });

  useEffect(() => {
    if (!showDashboard && web3auth) {
      console.log('pushing to dashboard');
      router.push('/login');
    }
  }, [showDashboard, router.pathname, web3auth]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          fontFamily: 'DM Sans',
          padding: '0 !important',
          width: '100vw',
          maxWidth: '100vw !important',
          height: '100vh',
        }}
      >
        {showDashboard ? (
          <DashboardLayout>{children}</DashboardLayout>
        ) : (
          <>{children}</>
        )}
        <Toaster />
      </Container>
    </ThemeProvider>
  );
};

export default Wrapper;
