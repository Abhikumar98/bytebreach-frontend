import { Divider, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import AutoComplete from '@/atoms/AutoComplete';
import Modal, { ModalFormCTA } from '@/atoms/Modal';
import TableComponent, { Column } from '@/atoms/Table';

import { ICreateProjectForm } from '@/types';

interface DataType {
  key: React.Key;
  name: string;
  chinese: number;
  math: number;
  english: number;
}

// Columns definition
const columns: Column<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: (a: DataType, b: DataType) => a.chinese - b.chinese,
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: (a: DataType, b: DataType) => a.math - b.math,
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: (a: DataType, b: DataType) => a.english - b.english,
  },
];
// Example data
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'John Brown',
    chinese: 12,
    math: 60,
    english: 70,
  },
  {
    key: '3',
    name: 'John Brown',
    chinese: 32,
    math: 60,
    english: 70,
  },
  {
    key: '4',
    name: 'John Brown',
    chinese: 54,
    math: 60,
    english: 70,
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
