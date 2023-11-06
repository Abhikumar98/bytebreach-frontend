import { styled, Typography } from '@mui/material';
import React from 'react';
import Markdown from 'react-markdown';

const StyledBugDetailsOPContainer = styled('div')`
  display: flex;
  align-items: start;
  margin: ${({ theme }) => theme.spacing(4)} 0;
  gap: 1rem;
  width: 100%;
  img {
    height: 72px;
    width: 72px;
    border-radius: 50%;
  }

  .description-container {
    margin-top: ${({ theme }) => theme.spacing(2)};
    background: ${({ theme }) => theme.palette.background.default};
    padding: ${({ theme }) => theme.spacing(4)}
      ${({ theme }) => theme.spacing(6)};
    border-radius: 2rem;
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadows[2]};
    margin-left: -${({ theme }) => theme.spacing(6)};
  }
`;

const BugDetailsOPContainer = () => {
  const markdown = `
  
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, enim optio consequuntur soluta est cupiditate officia provident? Incidunt, atque. Maiores ipsum ex corporis totam laudantium est dolorem laboriosam exercitationem dicta?

  `;

  return (
    <StyledBugDetailsOPContainer>
      <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
      <div className='w-full'>
        <Typography>Original Poster</Typography>
        <Typography variant='h5' fontWeight={600}>
          Original Poster
        </Typography>
        <div className='description-container'>
          <Typography fontWeight={500}>Description</Typography>
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    </StyledBugDetailsOPContainer>
  );
};

export default BugDetailsOPContainer;
