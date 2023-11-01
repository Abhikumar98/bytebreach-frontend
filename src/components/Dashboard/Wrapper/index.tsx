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
  const { userInfo, isAuthenticated, isOnboarded } = useAppContext();

  const router = useRouter();
  const showDashboard = userInfo && isAuthenticated && isOnboarded;

  console.log({ showDashboard });

  useEffect(() => {
    if (!showDashboard) {
      router.push('/login');
    }
  }, [showDashboard, router.pathname]);

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
