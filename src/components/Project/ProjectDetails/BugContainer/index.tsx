import { styled, Typography } from '@mui/material';
import React from 'react';

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
  const bugs = [
    {
      title: 'Bug 1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
      description: 'Bug 1 description',
    },
    {
      title: 'Bug 1',
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
          <StyledBugItem key={index}>
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
