import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import ArrowRight from '@/assets/arrowRight.svg';
import Plus from '@/assets/plus.svg';
import Button from '@/atoms/Button';
import ShadowCard from '@/atoms/ShadowCard';
import { useAppContext } from '@/context';

import { AppRoutes } from '@/types';

const StyledBugContainer = styled('div')`
  max-height: calc(100% - 4rem);
`;

const StyledBugItem = styled('div')`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  cursor: pointer;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 -${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  &:hover {
    background: ${({ theme }) => theme.palette.background.paper};
  }
`;

const BugContainer = () => {
  const { query, push, pathname } = useRouter();
  const { isClientUser } = useAppContext();

  const handleCreateBugRoute = () => {
    const { projectId } = query;

    push(AppRoutes.NewBug.replace('{projectId}', projectId as string));
  };

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
      description:
        'Description lorem ipsum dolor set lorem ipsum dolor set lorem ipsum dolor set',
    },
    {
      title: 'Bug 1',
      id: '1',
      description:
        'Description lorem ipsum dolor set lorem ipsum dolor set lorem ipsum dolor set',
    },
    {
      title: 'Bug 1',
      id: '1',
      description:
        'Description lorem ipsum dolor set lorem ipsum dolor set lorem ipsum dolor set',
    },
    {
      title: 'Bug 1',
      id: '1',
      description:
        'Description lorem ipsum dolor set lorem ipsum dolor set lorem ipsum dolor set',
    },
    {
      title: 'Bug 1',
      id: '1',
      description:
        'Description lorem ipsum dolor set lorem ipsum dolor set lorem ipsum dolor set',
    },
  ];

  return (
    <ShadowCard>
      <StyledBugContainer>
        <div className='flex items-center justify-between'>
          <Typography component='h5' fontSize='1.5rem'>
            Bugs
          </Typography>
          {!isClientUser && (
            <Button
              onClick={handleCreateBugRoute}
              startIcon={<Plus />}
              variant='outlined'
              size='small'
            >
              Create Bug
            </Button>
          )}
        </div>
        <div>
          {bugs.map((bug, index) => (
            <StyledBugItem onClick={() => handleBugRoute(bug.id)} key={index}>
              <div>
                <Typography fontWeight='regular' component='h6'>
                  {bug.title}
                </Typography>
                <Typography variant='subtitle1'>{bug.description}</Typography>
              </div>
              <div>
                <ArrowRight />
              </div>
            </StyledBugItem>
          ))}
        </div>
      </StyledBugContainer>
    </ShadowCard>
  );
};

export default BugContainer;
