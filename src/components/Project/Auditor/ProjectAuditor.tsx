import { Tab, Tabs } from '@mui/material';
import React from 'react';

import { DashboardTabs } from '@/types';

const ProjectTabAuditor: React.FC<{
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
      <Tab label='Requested' value={DashboardTabs.AuditorRequested} />
      <Tab label='Ongoing' value={DashboardTabs.AuditorOngoing} />
      <Tab label='Done' value={DashboardTabs.AuditorDone} />
    </Tabs>
  );
};

export default ProjectTabAuditor;
