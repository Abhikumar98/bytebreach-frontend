import { styled } from '@mui/material';
import React from 'react';

const StyledSidebarLayout = styled('div')`
  width: 15rem;
  height: 100vh;

  background-color: ${({ theme }) => theme.palette.background.default};
`;

const ChatSidebar = () => {
  return <StyledSidebarLayout>ChatSidebar</StyledSidebarLayout>;
};

export default ChatSidebar;
