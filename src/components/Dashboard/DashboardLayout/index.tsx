import { Button, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { defaultErrorMessage } from '@/lib/helper';

import Chat from '@/assets/chat.svg';
import Logo from '@/assets/logo.svg';
import Logout from '@/assets/logout.svg';
import Plus from '@/assets/plus.svg';
import Profile from '@/assets/profile.svg';
import Project from '@/assets/project.svg';
import { useAppContext } from '@/context';

import { INavigationRoute } from '@/types';

const SidepanelContainer = styled('div')`
  width: 15rem;
  height: 100vh;
  padding: 0 0.5rem;
  background: white;

  .logo {
    padding: ${({ theme }) => theme.spacing(2)};
    margin: 1rem 0;
    display: flex;
    align-items: center;
  }
  & .logo svg {
    height: 64px;
    width: 56px;
  }
`;

const DashboardChildrenContainer = styled('div')`
  width: calc(100vw - 15rem);
  height: 100vh;
  background: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(10)};
`;

const SidebarContainer = styled('div')`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;

const SidebarNavigationItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  cursor: pointer;
  height: 3rem;
  /* margin: 0 0.5rem 1rem 0.5rem; */
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  padding: 0rem 1rem;
  background: ${({ theme, active }) =>
    active ? theme.palette.secondary.light : ''};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  .icon {
    margin-right: 1rem;
    & svg {
      height: 24px;
      width: 24px;
    }
  }
`;

const navigation: INavigationRoute[] = [
  {
    title: 'Project',
    route: '/',
    icon: <Project />,
  },
  {
    title: 'Edit Profile',
    route: '/edit-profile',
    icon: <Profile />,
  },
  {
    title: 'Messaging',
    route: '/chat',
    icon: <Chat />,
  },
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { updateUserInfo, web3auth, handleLogout, setIsAuthenticated } =
    useAppContext();

  const { push } = useRouter();

  const handleUserLogout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  const handleRouteUpdate = (item: INavigationRoute) => {
    push(item.route);
  };

  const { pathname } = useRouter();

  return (
    <div className='flex'>
      <SidepanelContainer>
        <div className='logo'>
          <Logo />
          <Typography variant='h5'>Bytebreach</Typography>
        </div>
        <div className='flex w-full justify-center'>
          <Button
            size='medium'
            sx={{
              margin: '0 auto',
            }}
            variant='outlined'
            startIcon={<Plus />}
          >
            Create new project
          </Button>
        </div>
        <SidebarContainer>
          {navigation.map((item, index) => (
            <SidebarNavigationItem
              onClick={() => handleRouteUpdate(item)}
              active={pathname === item.route}
              key={index}
            >
              <div className='icon'>{item.icon}</div>
              <div className='title'>{item.title}</div>
            </SidebarNavigationItem>
          ))}
        </SidebarContainer>
        <Button
          color='error'
          variant='text'
          startIcon={<Logout />}
          onClick={handleUserLogout}
        >
          Logout
        </Button>
      </SidepanelContainer>
      <DashboardChildrenContainer>{children}</DashboardChildrenContainer>
    </div>
  );
};

export default DashboardLayout;
