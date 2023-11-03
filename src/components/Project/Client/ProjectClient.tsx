import { Tab, Tabs } from '@mui/material';
import React from 'react';

import { DashboardTabs } from '@/types';

const ProjectClient: React.FC<{
  currentTab: DashboardTabs;
  updateCurrentTab: (tab: DashboardTabs) => void;
}> = ({ currentTab, updateCurrentTab }) => {
  return (
    <Tabs
      value={currentTab}
      onChange={(value, selectedTab) => updateCurrentTab(selectedTab)}
      aria-label='basic tabs example'
      sx={{
        paddingBottom: '1rem',
      }}
    >
      <Tab label='Ongoing' value={DashboardTabs.ClientOngoing} />
      <Tab label='Done' value={DashboardTabs.ClientDone} />
    </Tabs>
  );
};

export default ProjectClient;
