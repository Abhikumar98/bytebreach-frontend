import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/atoms/Input';
import Modal, { ModalFormCTA } from '@/atoms/Modal';
import Select, { IOption } from '@/atoms/Select';

import { ICreateProjectForm } from '@/types';

const testOptions: IOption[] = [
  {
    label: 'Option 1',
    value: 'option-1',
  },
  {
    label: 'Option 2',
    value: 'option-2',
  },
  {
    label: 'Option 3',
    value: 'option-3',
  },
];

const CreateProjectModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
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

  return (
    <Modal
      open={open}
      title='Create new project'
      description='Enter the details to create a project'
      onClose={() => {
        console.log('hello');
        onClose();
        reset();
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          {...register('title', {
            required: {
              value: true,
              message: 'Please enter a title',
            },
          })}
          mandatory
          label='Title'
          errors={errors}
          placeholder='Project Title'
        />
        <Input
          {...register('githubLink', {
            required: {
              value: true,
              message: 'Please enter a github link',
            },
          })}
          mandatory
          label='GitHub Link / Upload Code'
          errors={errors}
          placeholder='https://github.com/xyz'
        />
        <Input
          {...register('budget', {
            required: {
              value: true,
              message: 'Please enter a budget',
            },
            min: {
              value: 1,
              message: 'Budget cannot be negative',
            },
          })}
          mandatory
          label='Budget'
          errors={errors}
        />
        <Select
          {...register('category')}
          options={testOptions}
          placeholder='Select a category'
          label='Category'
        />
        <Select
          {...register('estimatedStartTime')}
          options={testOptions}
          label='Estimated start time'
          placeholder='Select estimated start time'
        />
        <Select
          {...register('totalAuditTime')}
          options={testOptions}
          placeholder='Select total audit time'
          label='Total audit time'
        />
        <ModalFormCTA>Submit</ModalFormCTA>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
