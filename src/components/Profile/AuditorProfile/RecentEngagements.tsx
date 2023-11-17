import { styled, Typography } from '@mui/material';
import React from 'react';

import ShadowCard from '@/atoms/ShadowCard';
import TableComponent, { Column } from '@/atoms/Table';

const StyledRecentEngagements = styled('div')`
  width: 100%;
  height: 20.5rem;
`;

interface AuditorWorkProps {
  name: string;
  team: string;
  timeline: string;
}

const tableColumns: Column<AuditorWorkProps>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record) => {
      return <Typography>{record.name}</Typography>;
    },
  },
  {
    title: 'Team',
    dataIndex: 'team',
    render: (text, record) => {
      console.log({ record });
      return (
        <div className='relative -top-4'>
          <img
            src='https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/14d9d215-213f-4b6b-de4d-225a668b8800/public'
            className='absolute top-0 h-8 w-8 rounded-full border-2 border-white '
          />
          <img
            src='https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/b1f3fd24-fda2-4753-74e0-03dab2d5b400/public'
            className='absolute left-3 top-0 h-8 w-8 rounded-full border-2 border-white '
          />
          <img
            src='https://imagedelivery.net/wtv4_V7VzVsxpAFaxzmpbw/14d9d215-213f-4b6b-de4d-225a668b8800/public'
            className='absolute left-6 top-0 h-8 w-8 rounded-full border-2 border-white '
          />
        </div>
      );
    },
  },
  {
    title: 'Timeline',
    dataIndex: 'timeline',
    render: (text, record) => {
      return <Typography>{record.timeline}</Typography>;
    },
  },
];

const recentEngagements: AuditorWorkProps[] = [
  {
    name: 'Lumos Labs - v3',
    team: 'Pending',
    timeline: '01 Jun 2023 - 03 July 2023',
  },
  {
    name: 'Osmosis Contracts',
    team: 'Pending',
    timeline: '06 Aug 2023 - 03 Sept 2023',
  },
  {
    name: 'Pendulum labs Factory - v2',
    team: 'Pending',
    timeline: '09 Oct - 04 Nov 2023',
  },
];

const RecentEngagements = () => {
  return (
    <ShadowCard>
      <StyledRecentEngagements>
        <Typography component='h5' fontSize='1.5rem' fontWeight={500}>
          Recent engagements
        </Typography>
        <TableComponent data={recentEngagements} columns={tableColumns} />
      </StyledRecentEngagements>
    </ShadowCard>
  );
};

export default RecentEngagements;
