import React, { ReactNode } from 'react';

import AppContext from '@/context';

const Layout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <AppContext>{children}</AppContext>;
};

export default Layout;
