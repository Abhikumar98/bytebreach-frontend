import { styled } from '@mui/material';
import React, { ReactNode } from 'react';

import AuditorDoneProjects from '@/components/Project/Auditor/AuditorDoneProjects';
import AuditorOngoingProjects from '@/components/Project/Auditor/AuditorOngoingProjects';
import AuditorRequestedProjects from '@/components/Project/Auditor/AuditorRequestedProjects';
import ProjectAuditor from '@/components/Project/Auditor/ProjectAuditor';
import ClientDoneProjects from '@/components/Project/Client/ClientDoneProjects';
import ClientOngoingProjects from '@/components/Project/Client/ClientOngoingProjects';
import ProjectClient from '@/components/Project/Client/ProjectClient';
import ProjectContainer from '@/components/Project/ProjectSection/ProjectContainer';
import ProjectSectionContainer from '@/components/Project/ProjectSection/ProjectSectionContainer';

import PageHeader from '@/atoms/PageHeader';
import { useAppContext } from '@/context';

import { DashboardTabs } from '@/types';

const Container = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: 1rem;
`;

const HomePage = () => {
  const { isClientUser } = useAppContext();

  const [currentSelectedTab, setCurrentSelectedTab] =
    React.useState<DashboardTabs>(DashboardTabs.ClientOngoing);

  const tabComponentMapping: Record<DashboardTabs, ReactNode> = {
    client_ongoing: <ClientOngoingProjects />,
    client_done: <ClientDoneProjects />,
    auditor_requested: <AuditorRequestedProjects />,
    auditor_ongoing: <AuditorOngoingProjects />,
    auditor_done: <AuditorDoneProjects />,
  };

  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <Container>
        <ProjectContainer>
          {isClientUser ? (
            <ProjectClient
              currentTab={currentSelectedTab}
              updateCurrentTab={setCurrentSelectedTab}
            />
          ) : (
            <ProjectAuditor
              currentTab={currentSelectedTab}
              updateCurrentTab={setCurrentSelectedTab}
            />
          )}
        </ProjectContainer>
        <ProjectSectionContainer>
          {tabComponentMapping[currentSelectedTab]}
        </ProjectSectionContainer>
      </Container>
    </div>
  );
};

export default HomePage;
