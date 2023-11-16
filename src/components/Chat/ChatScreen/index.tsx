import { Color, styled, Typography } from '@mui/material';
import React from 'react';

import Plane from '@/assets/plane.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';

const StyledSidebarLayout = styled('div')`
  width: calc(100vw - 35rem);
  height: calc(100vh - 2rem);

  overflow: auto;

  background-color: ${({ theme }) =>
    (theme.palette.secondary as Partial<Color>)[50]};

  padding: 1rem;

  gap: 0.5rem;

  .header-container {
    position: relative;

    img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      border: 3px solid white;
      position: absolute;
      top: 0.5rem;

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
  }

  .message-container {
    height: calc(100vh - 11rem);
  }
`;

const StyledTheirChatMessage = styled('div')`
  padding: 1rem;

  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  max-width: 50%;
`;

const TheirChatMessage = ({ text }: { text: string }) => {
  return (
    <div className='relative'>
      <StyledTheirChatMessage>{text}</StyledTheirChatMessage>
      <Typography
        variant='subtitle2'
        sx={{
          position: 'absolute',
          left: 0,
          color: '#6F6C90',
        }}
      >
        12:35 pm
      </Typography>
    </div>
  );
};

const StyledOurChatMessage = styled('div')`
  border-top-right-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  padding: 1rem;

  background: #2f63ff;

  max-width: 50%;
  color: white;

  margin-left: auto;
`;

const OurChatMessage = ({ text }: { text: string }) => {
  return (
    <div className='relative'>
      <StyledOurChatMessage>{text}</StyledOurChatMessage>
      <Typography
        variant='subtitle2'
        sx={{
          position: 'absolute',
          right: 0,
          color: '#6F6C90',
        }}
      >
        12:35 pm
      </Typography>
    </div>
  );
};

const ChatScreen = () => {
  return (
    <StyledSidebarLayout>
      <div className='flex items-center'>
        <div className='header-container h-20'>
          <div className='mr-4 w-36'>
            <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
            <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
            <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
          </div>
        </div>
        <Typography variant='h5'>Group 1</Typography>
      </div>
      <div className=''>
        <div className='message-container space-y-10'>
          <TheirChatMessage text='test message' />
          <OurChatMessage text='test message' />
          <OurChatMessage text='test message' />
          <TheirChatMessage text='test message' />
          <TheirChatMessage text='test message' />

          <OurChatMessage text='test message' />
          <OurChatMessage text='test message' />
        </div>

        <div className='inline-flex w-full items-end space-x-4 '>
          <div className='w-full'>
            <Input placeholder='Your message' size='small' className='w-full' />
          </div>
          <Button endIcon={<Plane />} variant='outlined' size='small'>
            Send
          </Button>
        </div>
      </div>
    </StyledSidebarLayout>
  );
};

export default ChatScreen;
