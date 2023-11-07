import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { AppRoutes } from '@/types';

const StyledBugContainer = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing(8)};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows[2]};
`;

const StyledBugItem = styled('div')`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  cursor: pointer;
  border-radius: 1rem;

  margin: 0 -${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  &:hover {
    background: ${({ theme }) => theme.palette.background.paper};
  }
`;

const BugContainer = () => {
  const { query, push, pathname } = useRouter();

  const handleBugRoute = (bugId: string) => {
    const { projectId } = query;

    push(
      AppRoutes.BugDetails.replace('{bugId}', bugId).replace(
        '{projectId}',
        projectId as string
      )
    );
  };

  const bugs = [
    {
      title: 'Bug 1',
      id: '1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
      id: '1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
      id: '1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
      id: '1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
      id: '1',
      description: 'Bug 1 description',
    },
  ];

  return (
    <StyledBugContainer>
      <Typography fontWeight='bold' component='h2'>
        Bugs
      </Typography>
      <div>
        {bugs.map((bug, index) => (
          <StyledBugItem onClick={() => handleBugRoute(bug.id)} key={index}>
            <Typography fontWeight='regular' component='h6'>
              {bug.title}
            </Typography>
            <Typography variant='subtitle1'>{bug.description}</Typography>
          </StyledBugItem>
        ))}
      </div>
    </StyledBugContainer>
  );
};

export default BugContainer;
