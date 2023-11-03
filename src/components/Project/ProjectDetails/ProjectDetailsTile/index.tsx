import { styled, Typography, useTheme } from '@mui/material';
import React from 'react';

const StyledProjectDetailsTile = styled('div')`
  box-shadow: ${({ theme }) => theme.shadows[2]};
  padding: ${({ theme }) => theme.spacing(8)};
  border-radius: 1rem;
  background: ${({ theme }) => theme.palette.background.default};

  .auditor {
    display: flex;
    align-items: center;

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: ${({ theme }) => theme.spacing(4)};
    }
  }
`;

const ProjectDetailsTile = () => {
  const theme = useTheme();

  return (
    <StyledProjectDetailsTile>
      <div className='mb-4'>
        <Typography fontWeight='bold' component='h5'>
          Project Title
        </Typography>
        <Typography variant='subtitle1'>Actual project name</Typography>
      </div>
      <div className='mb-4'>
        <Typography fontWeight='bold' component='h5'>
          Code Link
        </Typography>
        <Typography variant='subtitle1'>Actual code link</Typography>
      </div>
      <div className='mb-4'>
        <Typography fontWeight='bold' component='h5'>
          Cost
        </Typography>
        <Typography variant='subtitle1'>$1234</Typography>
      </div>
      <div className='mb-4'>
        <Typography
          fontWeight='bold'
          component='h5'
          sx={{
            marginBottom: theme.spacing?.(2),
          }}
        >
          Auditors
        </Typography>
        <div className='auditor'>
          <img src='https://xsgames.co/randomusers/assets/avatars/male/27.jpg' />
          <div className='auditor-details-container'>
            <Typography component='h5' fontWeight='medium'>
              Auditor name
            </Typography>
            <Typography fontSize='0.75rem' fontWeight='thin'>
              Auditor
            </Typography>
          </div>
        </div>
      </div>
    </StyledProjectDetailsTile>
  );
};

export default ProjectDetailsTile;
