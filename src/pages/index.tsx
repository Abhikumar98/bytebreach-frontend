import { styled } from '@mui/material';
import React from 'react';

import ProjectClient from '@/components/Project/Client/ProjectClient';
import ProjectContainer from '@/components/Project/ProjectContainer';
import ProjectSectionContainer from '@/components/Project/ProjectSectionContainer';

import PageHeader from '@/atoms/PageHeader';

const Container = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: 1rem;
`;

const HomePage = () => {
  return (
    <div className='h-full w-full'>
      <PageHeader title='Projects' />
      <Container>
        <ProjectContainer>
          <ProjectClient />
        </ProjectContainer>
        <ProjectSectionContainer>
          <div>something</div>
        </ProjectSectionContainer>
      </Container>
    </div>
  );
};

export default HomePage;
