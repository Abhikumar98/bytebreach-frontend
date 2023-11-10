import { Divider, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import AutoComplete from '@/atoms/AutoComplete';
import Modal, { ModalFormCTA } from '@/atoms/Modal';
import TableComponent, { Column } from '@/atoms/Table';

import { IAuditorRecommendationProfile, ICreateProjectForm } from '@/types';

// Columns definition
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
    dataIndex: 'auditor_id',
    sorter: (
      a: IAuditorRecommendationProfile,
      b: IAuditorRecommendationProfile
    ) => a.auditor_id - b.auditor_id,
  },
  {
    title: 'Related audits',
    dataIndex: 'auditor_id',
  },
];
// Example data
const data: IAuditorRecommendationProfile[] = [
  {
    first_name: 'John',
    last_name: 'Doe',
    auditor_id: 1,
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    auditor_id: 1,
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    auditor_id: 1,
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    auditor_id: 1,
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    auditor_id: 1,
  },
];

const SelectAuditorModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [allAuditors, setAllAuditors] = React.useState<string[]>([]);

  const [dreamTeam, setDreamTeam] = React.useState<string[]>([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      githubLink: '',
      category: '',
      budget: 0,
      estimatedStartTime: '',
      totalAuditTime: '',
    },
  });

  const handleFormSubmit = (values: ICreateProjectForm) => {
    console.log({ values });
  };

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  const handleSelectionChange = (selectedKeys: React.Key[]) => {
    console.log({ selectedKeys });
  };

  return (
    <Modal
      open={open}
      title='Our recommendation'
      description='Enter the details to create a project'
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TableComponent
          data={data}
          columns={columns}
          isSelectable={true}
          onSelectionChange={handleSelectionChange}
        />

        <Divider
          sx={{
            margin: '1rem 0',
          }}
        />
        <Typography variant='h6'>Select your dream team</Typography>

        <AutoComplete options={[]} />

        <ModalFormCTA>Submit</ModalFormCTA>
      </form>
    </Modal>
  );
};

export default SelectAuditorModal;
