import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import BugComment from '@/components/Project/Bug/BugDetails/BugComment';
import BugDetailsOPContainer from '@/components/Project/Bug/BugDetails/BugDetailsOPContainer';

import BackButton from '@/assets/arrowLeft.svg';

const StyledBugDetailContainer = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing(8)}
    ${({ theme }) => theme.spacing(12)};
  border-radius: 1rem;
  margin: ${({ theme }) => theme.spacing(4)} 0;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  position: relative;
  height: calc(100% - 9rem);

  .bug-scroll-container {
    height: calc(100% - 2rem);
    overflow: auto;
  }

  .back-button-container {
    position: absolute;
    top: 2.2rem;
    left: 0.8rem;
    cursor: pointer;

    svg {
      height: 24px;
      width: 24px;
    }
  }

  .markdown-container {
    min-height: 4rem;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    border-radius: 1rem;
  }

  textarea {
    width: calc(100% - 2rem) !important;
  }
`;

const BugDetails = () => {
  const { back } = useRouter();

  return (
    <StyledBugDetailContainer>
      <div onClick={back} className='back-button-container'>
        <BackButton />
      </div>
      <Typography variant='h5' fontWeight='medium'>
        Report a bug
      </Typography>

      <div className='bug-scroll-container'>
        <BugDetailsOPContainer />

        <BugComment />
        <BugComment />
        <BugComment />
        <BugComment />
        <BugComment />
      </div>
    </StyledBugDetailContainer>
  );
};

export default BugDetails;
