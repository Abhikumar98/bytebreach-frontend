import { styled } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import DatePicker from '@/atoms/DatePicker';
import Input from '@/atoms/Input';
import Modal, { ModalFormCTA } from '@/atoms/Modal';
import RangeSlider from '@/atoms/RangeSlider';
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

const StyledInputValue = styled('input')`
  color: ${({ theme }) => theme.palette.text.secondary};
  border-radius: 15rem;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  min-width: 4rem;
`;

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
    },
  });

  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [sliderValue, setSliderValue] = React.useState<number[]>([20, 37]);

  const handleFormSubmit = (values: ICreateProjectForm) => {
    console.log({ values });
  };

  console.log({ sliderValue });

  const handleModalClose = () => {
    onClose();
    reset();
    setSelectedDate(null);
    setSliderValue([20, 37]);
  };

  return (
    <Modal
      open={open}
      title='Create new project'
      description='Enter the details to create a project'
      onClose={handleModalClose}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
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
          label='GitHub Link'
          errors={errors}
          placeholder='https://github.com/xyz'
        />
        <Select
          {...register('category')}
          options={testOptions}
          placeholder='Select a category'
          label='Category'
          mandatory
        />
        <div>
          <RangeSlider
            min={1}
            max={10000}
            step={1}
            mandatory
            label='Weekly cost'
            value={sliderValue}
            setValue={setSliderValue}
          />
          <div className='flex items-center space-x-4'>
            <StyledInputValue
              value={sliderValue[0]}
              onChange={(e) => {
                setSliderValue([Number(e.target.value), sliderValue[1]]);
              }}
            />
            <span>-</span>
            <StyledInputValue
              value={sliderValue[1]}
              onChange={(e) => {
                setSliderValue([sliderValue[0], Number(e.target.value)]);
              }}
            />
          </div>
        </div>
        <DatePicker
          mandatory
          value={selectedDate}
          onChange={setSelectedDate}
          label='Estimated start time'
        />

        <ModalFormCTA>Submit</ModalFormCTA>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
