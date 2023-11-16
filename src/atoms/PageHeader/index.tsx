import { styled, Typography } from '@mui/material';
import React from 'react';

import useTheme from '@/hooks/useTheme';

import Moon from '@/assets/moon.svg';
import Sun from '@/assets/sun.svg';

const StyledShadowPill = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: 15rem;
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};

  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;

  gap: ${({ theme }) => theme.spacing(2)};

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  img {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
  }
`;

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  return (
    <div className='flex w-full items-start justify-between'>
      <Typography
        variant='h3'
        fontWeight='bold'
        className='mb-8'
        color={theme.palette?.text?.primary}
      >
        {title}
      </Typography>
      <StyledShadowPill>
        <div className='flex cursor-pointer items-center'>
          {isDarkMode ? <Sun /> : <Moon />}{' '}
        </div>
        <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
      </StyledShadowPill>
    </div>
  );
};

export default PageHeader;
