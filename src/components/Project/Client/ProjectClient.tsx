import { Tab, Tabs } from '@mui/material';
import React from 'react';

const ProjectClient = () => {
  const [currentTab, setCurrentTab] = React.useState<'ongoing' | 'done'>(
    'ongoing'
  );

  return (
    <Tabs
      value={currentTab}
      onChange={(value, selectedTab) => setCurrentTab(selectedTab)}
      aria-label='basic tabs example'
      sx={{
        paddingBottom: '1rem',
      }}
    >
      <Tab label='Ongoing' value='ongoing' />
      <Tab label='Done' value='done' />
    </Tabs>
  );
};

export default ProjectClient;
