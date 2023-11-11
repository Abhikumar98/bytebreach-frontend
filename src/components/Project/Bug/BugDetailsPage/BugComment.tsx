import { styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import Markdown from 'react-markdown';

const StyledBugDetailsOPContainer = styled('div')`
  display: flex;
  align-items: start;
  margin: ${({ theme }) => theme.spacing(4)} 0;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  gap: 1rem;
  width: 100%;
  img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }

  .description-container {
    margin-top: ${({ theme }) => theme.spacing(2)};
    background: ${({ theme }) => theme.palette.background.default};
    padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(6)}`};
    border-radius: 2rem;
    width: calc(100% - 3rem);
    box-shadow: ${({ theme }) => theme.shadows[2]};
    margin-left: -${({ theme }) => theme.spacing(6)};
  }
`;

const BugComment: FC<{
  name: string;
  description: string;
  postedAt: string;
}> = ({ name, description, postedAt }) => {
  return (
    <StyledBugDetailsOPContainer>
      <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
      <div className='w-full'>
        <div className='flex items-end space-x-4'>
          <Typography fontWeight={500}>{name} </Typography>
          <Typography fontSize='0.75rem'>
            {dayjs(postedAt).format('DD MMM, YYYY HH:MM A')}
          </Typography>
        </div>
        <Markdown className='w-full'>{description}</Markdown>
      </div>
    </StyledBugDetailsOPContainer>
  );
};

export default BugComment;
