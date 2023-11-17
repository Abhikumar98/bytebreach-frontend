import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import ArrowRight from '@/assets/arrowRight.svg';
import Plus from '@/assets/plus.svg';
import Button from '@/atoms/Button';
import ShadowCard from '@/atoms/ShadowCard';
import { useAppContext } from '@/context';
import { getBugList } from '@/services';

import { AppRoutes, IBugListItem } from '@/types';

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
  const { query, push } = useRouter();

  const projectId = query.projectId?.toString();

  const { isClientUser, userInfo } = useAppContext();

  const [bugList, setBugList] = React.useState<IBugListItem[]>([]);

  const handleCreateBugRoute = () => {
    push(AppRoutes.NewBug.replace('{projectId}', projectId as string));
  };

  const handleBugRoute = (bugId: number) => {
    push(
      AppRoutes.BugDetails.replace('{bugId}', String(bugId)).replace(
        '{projectId}',
        projectId as string
      )
    );
  };

  const handleGetBugList = async () => {
    try {
      const response = await getBugList(Number(projectId));

      setBugList(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      handleGetBugList();
    }
  }, [projectId]);

  return (
    <ShadowCard>
      <StyledBugContainer>
        <div className='flex items-center justify-between'>
          <Typography component='h5' fontSize='1.5rem'>
            Bugs
          </Typography>
          {!isClientUser && userInfo?.first_name && (
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
          {bugList.map((bug, index) => (
            <StyledBugItem
              onClick={() => bug.bug_id && handleBugRoute(bug.bug_id)}
              key={index}
            >
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
