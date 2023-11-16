import { styled } from '@mui/material';
import React from 'react';

import ChatScreen from '@/components/Chat/ChatScreen';
import ChatSidebar from '@/components/Chat/ChatSidebar';

const StyledChatLayout = styled('div')`
  margin: -40px;
  height: 100vh;
  width: calc(100vw - 15rem);

  display: flex;
`;

const ChatLayout = () => {
  return (
    <StyledChatLayout>
      <ChatSidebar />
      <ChatScreen />
    </StyledChatLayout>
  );
};

export default ChatLayout;
