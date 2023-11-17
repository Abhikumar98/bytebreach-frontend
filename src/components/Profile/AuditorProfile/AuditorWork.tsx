import { styled, Typography } from '@mui/material';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';

const StyledAuditorWork = styled('div')`
  width: 100%;
  height: 18rem;
`;

const auditors = [
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/b1f3fd24-fda2-4753-74e0-03dab2d5b400/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/7aabf56e-2d29-4692-9a23-f01915fb3500/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/14d9d215-213f-4b6b-de4d-225a668b8800/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/1a71fcdb-ea3a-4082-ffdb-54b073a42200/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/c9d90fb6-569e-4d77-b6b9-69d5ea0b0c00/public',
];

const clients = [
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/14d9d215-213f-4b6b-de4d-225a668b8800/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/b1f3fd24-fda2-4753-74e0-03dab2d5b400/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/14d9d215-213f-4b6b-de4d-225a668b8800/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/b1f3fd24-fda2-4753-74e0-03dab2d5b400/public',
  'https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/b1f3fd24-fda2-4753-74e0-03dab2d5b400/public',
];

const AuditorWork = () => {
  return (
    <ShadowCard>
      <StyledAuditorWork>
        <Typography component='h5' fontSize='1.5rem' fontWeight={500}>
          Worked with
        </Typography>
        <div>
          <div>
            <Typography className='mb-4'>Client</Typography>

            <div className=''>
              {clients.map((auditor, index) => (
                <img
                  src={auditor}
                  key={index}
                  className='mb-4 mr-4 h-16 w-16 rounded-full'
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <Typography className='mb-4'>Auditors</Typography>

          <div className=''>
            {auditors.map((auditor, index) => (
              <img
                src={auditor}
                key={index}
                className='mb-4 mr-4 h-16 w-16 rounded-full'
              />
            ))}
          </div>
        </div>
      </StyledAuditorWork>
    </ShadowCard>
  );
};

export default AuditorWork;
