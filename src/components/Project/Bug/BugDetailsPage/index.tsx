import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import BugComment from '@/components/Project/Bug/BugDetailsPage/BugComment';
import BugDetailsOPContainer from '@/components/Project/Bug/BugDetailsPage/BugDetailsOPContainer';

import BackButton from '@/assets/arrowLeft.svg';
import { getBugDetails } from '@/services';

import { IBug } from '@/types';

const StyledBugDetailContainer = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(12)}`};
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
  const {
    back,
    query: { projectId, bugId },
  } = useRouter();

  const [bugDetails, setBugDetails] = React.useState<IBug | null>(null);

  const fetchBugDetails = async () => {
    try {
      const response = await getBugDetails(Number(bugId));

      setBugDetails(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    fetchBugDetails();
  }, []);

  return (
    <StyledBugDetailContainer>
      <div onClick={back} className='back-button-container'>
        <BackButton />
      </div>
      <Typography variant='h5' fontWeight='medium'>
        Bug discussion
      </Typography>

      {bugDetails && (
        <>
          <div className='bug-scroll-container'>
            <BugDetailsOPContainer
              markdown={bugDetails?.description ?? ''}
              firstName={bugDetails?.first_name}
              lastName={bugDetails?.last_name}
              title={bugDetails?.title}
            />

            {bugDetails?.comments?.map((comment) => (
              <BugComment
                key={comment.comment_id}
                name={`${comment.first_name} ${comment.last_name}`}
                description={comment.comment}
                postedAt={comment.created_at}
              />
            ))}
          </div>
        </>
      )}
    </StyledBugDetailContainer>
  );
};

export default BugDetails;
