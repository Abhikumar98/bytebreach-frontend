import { Tab, Tabs } from '@mui/material';
import React from 'react';

const ProjectAuditor = () => {
  const [currentTab, setCurrentTab] = React.useState<
    'requests' | 'ongoing' | 'done'
  >('requests');

  return (
    <Tabs
      value={currentTab}
      onChange={(value, selectedTab) => setCurrentTab(selectedTab)}
      aria-label='basic tabs example'
      sx={{
        paddingBottom: '1rem',
      }}
    >
      <Tab label='Requests' value='requests' />
      <Tab label='Ongoing' value='ongoing' />
      <Tab label='Done' value='done' />
    </Tabs>
  );
};

export default ProjectAuditor;
