import { styled } from '@mui/material';
import React, { ReactNode, useEffect } from 'react';

import AuditorDoneProjects from '@/components/Project/Auditor/AuditorDoneProjects';
import AuditorOngoingProjects from '@/components/Project/Auditor/AuditorOngoingProjects';
import AuditorRequestedProjects from '@/components/Project/Auditor/AuditorRequestedProjects';
import ProjectTabAuditor from '@/components/Project/Auditor/ProjectAuditor';
import ClientDoneProjects from '@/components/Project/Client/ClientDoneProjects';
import ClientOngoingProjects from '@/components/Project/Client/ClientOngoingProjects';
import ProjectTabClient from '@/components/Project/Client/ProjectClient';

import PageHeader from '@/atoms/PageHeader';
import { useAppContext } from '@/context';

import { DashboardTabs } from '@/types';

const Container = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: 1rem;
`;

const StyledProjectSectionContainer = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  padding: 1.2rem ${({ theme }) => theme.spacing(12)};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const StyledProjectContainer = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 0 ${({ theme }) => theme.spacing(8)};
  margin-top: ${({ theme }) => theme.spacing(5)};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    border-bottom: 2px ${({ theme }) => theme.palette.divider} solid;
  }
`;

const HomePage = () => {
  const { isClientUser, userInfo } = useAppContext();

  const [currentSelectedTab, setCurrentSelectedTab] =
    React.useState<DashboardTabs>(DashboardTabs.ClientOngoing);

  const tabComponentMapping: Record<DashboardTabs, ReactNode> = {
    client_ongoing: <ClientOngoingProjects />,
    client_done: <ClientDoneProjects />,
    auditor_requested: <AuditorRequestedProjects />,
    auditor_ongoing: <AuditorOngoingProjects />,
    auditor_done: <AuditorDoneProjects />,
  };

  useEffect(() => {
    if (isClientUser) {
      setCurrentSelectedTab(DashboardTabs.ClientOngoing);
    } else {
      setCurrentSelectedTab(DashboardTabs.AuditorRequested);
    }
  }, [isClientUser]);

  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <Container>
        <StyledProjectContainer>
          {isClientUser ? (
            <ProjectTabClient
              currentTab={currentSelectedTab}
              updateCurrentTab={setCurrentSelectedTab}
            />
          ) : (
            <ProjectTabAuditor
              currentTab={currentSelectedTab}
              updateCurrentTab={setCurrentSelectedTab}
            />
          )}
        </StyledProjectContainer>
        {userInfo?.first_name && (
          <StyledProjectSectionContainer>
            {tabComponentMapping[currentSelectedTab]}
          </StyledProjectSectionContainer>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
