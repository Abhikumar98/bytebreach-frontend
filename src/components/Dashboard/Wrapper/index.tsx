import { Container, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { unAuthenticatedRoutes } from '@/lib/helper';
import theme from '@/lib/styles';

import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AuthWrapper from '@/components/Dashboard/Wrapper/AuthWrapper';

import { useAppContext } from '@/context';

const Wrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { userInfo } = useAppContext();

  const router = useRouter();

  const isDashboardHidden = unAuthenticatedRoutes.includes(router.pathname);

  const showDashboard = true || userInfo;
  return (
    <AuthWrapper>
      <ThemeProvider theme={theme('light')}>
        <Container
          sx={{
            fontFamily: 'DM Sans',
            padding: '0 !important',
            width: '100vw',
            maxWidth: '100vw !important',
            height: '100vh',
          }}
        >
          {showDashboard && !isDashboardHidden ? (
            <DashboardLayout>{children}</DashboardLayout>
          ) : (
            <>{children}</>
          )}
          <Toaster />
        </Container>
      </ThemeProvider>
    </AuthWrapper>
  );
};

export default Wrapper;
