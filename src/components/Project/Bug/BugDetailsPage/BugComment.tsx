import { styled, Typography } from '@mui/material';
import React from 'react';

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
    padding: ${({ theme }) => theme.spacing(4)}
      ${({ theme }) => theme.spacing(6)};
    border-radius: 2rem;
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadows[2]};
    margin-left: -${({ theme }) => theme.spacing(6)};
  }
`;

const BugComment = () => {
  return (
    <StyledBugDetailsOPContainer>
      <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
      <div className='w-full'>
        <Typography fontWeight={500}>Name of commenter</Typography>
        <Typography>
          Description Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Similique, cumque? Doloribus, consequatur praesentium ipsum natus
          tenetur, dicta voluptas atque numquam quae quibusdam mollitia in.
          Neque aliquam consequatur veniam nemo iusto.
        </Typography>
      </div>
    </StyledBugDetailsOPContainer>
  );
};

export default BugComment;
