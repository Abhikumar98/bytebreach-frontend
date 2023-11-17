import { Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import AutoComplete from '@/atoms/AutoComplete';
import Button from '@/atoms/Button';
import ShadowCard from '@/atoms/ShadowCard';
import TableComponent, { Column } from '@/atoms/Table';
import { getAuditorRecommendation, postSelectRecommendation } from '@/services';

import { IAuditorRecommendationProfile } from '@/types';

const columns: Column<IAuditorRecommendationProfile>[] = [
  {
    title: 'Name',
    dataIndex: 'first_name',
    sorter: (
      a: IAuditorRecommendationProfile,
      b: IAuditorRecommendationProfile
    ) => a.first_name.localeCompare(b.first_name),
  },
  {
    title: 'Weekly cost',
    dataIndex: 'max_weekly_cost',
    sorter: (
      a: IAuditorRecommendationProfile,
      b: IAuditorRecommendationProfile
    ) => a.max_weekly_cost - b.max_weekly_cost,
    render(value, record) {
      return `$${record.min_weekly_cost} - $${record.max_weekly_cost}`;
    },
  },
  {
    title: 'Related audits',
    dataIndex: 'auditor_id',
    render(value, record) {
      return record.auditor_id;
    },
  },
];

const AuditorRecommendation: FC<{
  handleUpdateProject: () => Promise<void>;
}> = ({ handleUpdateProject }) => {
  const [allAuditors, setAllAuditors] = React.useState<
    IAuditorRecommendationProfile[]
  >([]);

  const {
    query: { projectId },
  } = useRouter();

  const [selectedAuditors, setSelectedAuditors] = React.useState<
    IAuditorRecommendationProfile[]
  >([]);

  const handleSelectionChange = (
    selectedKeys: IAuditorRecommendationProfile[]
  ) => {
    setSelectedAuditors(selectedKeys);
  };

  const handleModalSubmit = async () => {
    try {
      const auditorIds = selectedAuditors.map((auditor) => auditor.auditor_id);

      await postSelectRecommendation(auditorIds, Number(projectId));
      await handleUpdateProject();
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  const handleAuditorRecommendation = async () => {
    try {
      const response = await getAuditorRecommendation(Number(projectId));
      setAllAuditors(response);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      handleAuditorRecommendation();
    }
  }, [projectId]);

  const minMaxAuditorFee = selectedAuditors.reduce(
    (acc, curr) => {
      acc.min += curr.min_weekly_cost;
      acc.max += curr.max_weekly_cost;
      return acc;
    },
    { min: 0, max: 0 }
  );

  return (
    <ShadowCard>
      <TableComponent
        data={allAuditors}
        columns={columns}
        isSelectable={true}
        onSelectionChange={handleSelectionChange}
      />

      <Divider
        sx={{
          margin: '1rem 0',
        }}
      />

      <div className=' space-y-4'>
        <Typography variant='h6'>Select your dream team</Typography>

        <AutoComplete
          options={allAuditors}
          getOptionLabel={(option) => option.first_name}
          renderOption={(props, option) => (
            <li {...props}>
              <Typography>{option.first_name}</Typography>
            </li>
          )}
        />
      </div>

      <div className='my-4 flex justify-end'>
        <div className='flex gap-4'>
          <Typography>Project Cost</Typography>
          <Typography>{`$${minMaxAuditorFee.min} - $${minMaxAuditorFee.max}`}</Typography>
        </div>
      </div>

      <div className='items-cent flex justify-center'>
        <Button onClick={handleModalSubmit}>Proceed</Button>
      </div>
    </ShadowCard>
  );
};

export default AuditorRecommendation;
