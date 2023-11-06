import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';

import BackButton from '@/assets/arrowLeft.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import Select, { IOption } from '@/atoms/Select';

import { ICreateBugForm } from '@/types';

const StyledCreateBugForm = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing(8)}
    ${({ theme }) => theme.spacing(12)};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  margin: ${({ theme }) => theme.spacing(4)} 0;
  position: relative;

  .back-button-container {
    position: absolute;
    top: 2.2rem;
    left: 0.8rem;
    cursor: pointer;

    svg {
      height: 24px;
      width: 24px;
    }
  }

  .markdown-container {
    min-height: 4rem;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    border-radius: 1rem;
  }

  textarea {
    width: calc(100% - 2rem) !important;
  }
`;

const CreateBugForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<ICreateBugForm>({
    defaultValues: {
      title: '',
      codeLink: '',
      description: '',
      risk: '',
    },
  });

  const { back } = useRouter();

  const [descriptionMode, setDescriptionMode] = React.useState<
    'markdown' | 'text'
  >('text');

  const riskOptions: IOption[] = [
    {
      label: 'Low',
      value: 'low',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'High',
      value: 'high',
    },
  ];

  const handleFormSubmit = (values: ICreateBugForm) => {
    console.log({ values });
  };

  return (
    <StyledCreateBugForm>
      <div onClick={back} className='back-button-container'>
        <BackButton />
      </div>
      <Typography variant='h5' fontWeight='medium'>
        Report a bug
      </Typography>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className=' mt-2 space-y-4'
      >
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
          placeholder='Bug Title'
        />
        <Select
          {...register('risk')}
          options={riskOptions}
          placeholder='Select a risk'
          label='Risk'
        />

        <Input
          {...register('codeLink', {
            required: {
              value: true,
              message: 'Please enter a link to the code',
            },
          })}
          mandatory
          label='Link to affected code'
          errors={errors}
          placeholder='https://github.com/abcd'
        />

        <div>
          <Typography fontWeight='500'>Vulnerability details</Typography>
          <Typography>
            Link to all referenced sectors of code in GitHub. You can use
            markdown.
          </Typography>
        </div>

        <div className='flex items-center space-x-4'>
          <div onClick={() => setDescriptionMode('text')}>
            <Typography className='cursor-pointer' fontWeight={500}>
              Edit
            </Typography>
          </div>
          <div onClick={() => setDescriptionMode('markdown')}>
            <Typography className='cursor-pointer' fontWeight={500}>
              Preview
            </Typography>
          </div>
        </div>

        {descriptionMode === 'text' ? (
          <div className='w-full'>
            <textarea
              // component='textarea'
              className='min-h[5rem] resize-y rounded-xl p-4'
              {...register('description')}
            />
          </div>
        ) : (
          <Markdown className='markdown-container'>
            {getValues('description')}
          </Markdown>
        )}
        <Button type='submit'>Create bug</Button>
      </form>
    </StyledCreateBugForm>
  );
};

export default CreateBugForm;
