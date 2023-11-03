import { styled, Typography } from '@mui/material';
import React from 'react';

const StyledProjectTimeline = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing(8)};
  border-radius: 1rem;
  margin: ${({ theme }) => theme.spacing(4)} 0;
  box-shadow: ${({ theme }) => theme.shadows[2]};

  .timeline-container {
    background: ${({ theme }) => theme.palette.background.paper};
    padding: ${({ theme }) => theme.spacing(5)};
    border-radius: 1rem;
    margin-top: ${({ theme }) => theme.spacing(4)};
  }
`;

const ProjectTimeline = () => {
  return (
    <StyledProjectTimeline>
      <Typography variant='h5' fontWeight='medium'>
        Project name
      </Typography>
      <div className='timeline-container'>Timeline</div>
    </StyledProjectTimeline>
  );
};

export default ProjectTimeline;
