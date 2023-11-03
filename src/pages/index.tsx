import { styled } from '@mui/material';
import React, { ReactNode } from 'react';

import AuditorDoneProjects from '@/components/Project/Auditor/AuditorDoneProjects';
import AuditorOngoingProjects from '@/components/Project/Auditor/AuditorOngoingProjects';
import AuditorRequestedProjects from '@/components/Project/Auditor/AuditorRequestedProjects';
import ProjectAuditor from '@/components/Project/Auditor/ProjectAuditor';
import ClientDoneProjects from '@/components/Project/Client/ClientDoneProjects';
import ClientOngoingProjects from '@/components/Project/Client/ClientOngoingProjects';
import ProjectClient from '@/components/Project/Client/ProjectClient';
import ProjectContainer from '@/components/Project/ProjectContainer';
import ProjectSectionContainer from '@/components/Project/ProjectSectionContainer';

import PageHeader from '@/atoms/PageHeader';

const Container = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: 1rem;
`;

export type DashboardTabs =
  | 'client_ongoing'
  | 'client_done'
  | 'auditor_requested'
  | 'auditor_ongoing'
  | 'auditor_done';

const HomePage = () => {
  const [currentSelectedTab, setCurrentSelectedTab] =
    React.useState<DashboardTabs>('client_ongoing');

  const tabComponentMapping: Record<DashboardTabs, ReactNode> = {
    client_ongoing: <ClientOngoingProjects />,
    client_done: <ClientDoneProjects />,
    auditor_requested: <AuditorRequestedProjects />,
    auditor_ongoing: <AuditorOngoingProjects />,
    auditor_done: <AuditorDoneProjects />,
  };

  const isClient = true;

  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <Container>
        <ProjectContainer>
          {isClient ? <ProjectClient /> : <ProjectAuditor />}
        </ProjectContainer>
        <ProjectSectionContainer>
          {tabComponentMapping[currentSelectedTab]}
        </ProjectSectionContainer>
      </Container>
    </div>
  );
};

export default HomePage;
