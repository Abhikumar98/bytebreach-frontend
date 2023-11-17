import { Color, styled, Typography } from '@mui/material';
import React from 'react';

import Input from '@/atoms/Input';

const StyledChatSideTile = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  background: ${({ theme, active }) =>
    active ? (theme.palette.secondary as Partial<Color>)[50] : ''};
  margin: 0 -1rem;

  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  position: relative;

  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    border: 3px solid white;
    position: absolute;
    top: 0.25rem;

    &:nth-child(1) {
      z-index: 1;
    }
    &:nth-child(2) {
      z-index: 2;
      left: 2.5rem;
    }
    &:nth-child(3) {
      z-index: 3;
      left: 4rem;
    }
  }

  border-bottom: 1px solid
    ${({ theme, active }) => (!active ? theme.palette.divider : 'white')};
`;

const ChatSideTile = ({ active }: { active?: boolean }) => {
  return (
    <StyledChatSideTile active={active}>
      <div className='mr-4 w-36'>
        <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
        <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
        <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
      </div>
      <div className='w-full'>
        <div>Lumus Debug</div>
        <div className='flex w-full items-center justify-between'>
          <Typography variant='subtitle1'>Looking forward to it</Typography>
          <Typography variant='subtitle2'>12:44 pm</Typography>
        </div>
      </div>
    </StyledChatSideTile>
  );
};

const StyledSidebarLayout = styled('div')`
  width: 25rem;
  height: calc(100vh - 2rem);

  background-color: ${({ theme }) => theme.palette.background.default};
  padding: 1rem;
`;

const ChatSidebar = () => {
  return (
    <StyledSidebarLayout>
      <Typography variant='h5'>Messaging</Typography>
      <Input placeholder='Search' size='small' sx={{}} />
      <div className='my-4'>
        <ChatSideTile active />
      </div>
    </StyledSidebarLayout>
  );
};

export default ChatSidebar;
