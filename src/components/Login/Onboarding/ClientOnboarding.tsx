import { Divider, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import Web3 from 'web3';

import { defaultErrorMessage } from '@/lib/helper';

import ArrowLeft from '@/assets/arrowLeft.svg';
import Building from '@/assets/building.svg';
import Envelope from '@/assets/envelope.svg';
import Github from '@/assets/github.svg';
import Person from '@/assets/person.svg';
import Twitter from '@/assets/twitter.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

import { IClientOnboardingForm } from '@/types';
const BackButton = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  position: absolute;
  left: 2rem;
  top: 2rem;

  svg {
    height: 30px;
    width: 30px;
  }
`;

const ClientOnboarding = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IClientOnboardingForm>({
    defaultValues: {
      fullName: '',
      companyName: '',
      website: '',
      twitter: '',
      github: '',
      inviteCode: '',
    },
  });

  const theme = useTheme();

  const { web3auth, handleOnboardedUser, handleLogout } = useAppContext();

  // const { push } = useRouter();

  const handleFormSubmit = async (values: IClientOnboardingForm) => {
    try {
      console.log({ values });

      const web3 = new Web3(web3auth?.provider as any);
      const accounts = await web3.eth.getAccounts();
      handleOnboardedUser(accounts?.[0] ?? '');
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  console.log({ errors });

  return (
    <div className=' space-y-4'>
      <BackButton onClick={handleLogout}>
        <ArrowLeft />
      </BackButton>
      <div className='border-b border-b-gray-400 pb-4'>
        <div className='text-2xl font-bold'>Contact details</div>
        <Typography variant='subtitle1'>Enter your details to login</Typography>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          {...register('fullName', {
            required: {
              value: true,
              message: 'Please enter your full name',
            },
          })}
          mandatory
          errors={errors}
          placeholder='John Doe'
          label='Full Name'
          icon={<Person />}
        />
        <Input
          {...register('companyName', {
            required: {
              value: true,
              message: 'Please enter your company name',
            },
          })}
          mandatory
          errors={errors}
          placeholder='Google'
          label='Company Name'
          icon={<Building />}
        />
        <Input
          {...register('website')}
          placeholder='www.google.com'
          label='Website'
          icon={<Envelope />}
        />
        <div className='flex w-full space-x-6'>
          <div className='w-full'>
            <Input
              {...register('twitter')}
              placeholder='@johndoe'
              label='Twitter'
              icon={<Twitter />}
              fullWidth
            />
          </div>
          <div className='w-full'>
            <Input
              {...register('github')}
              placeholder='@coderjohndoe'
              label='Github'
              icon={<Github />}
              fullWidth
            />
          </div>
        </div>

        <Divider
          sx={{
            paddingTop: theme.spacing(4),
          }}
        />

        <Input
          {...register('inviteCode', {
            required: {
              value: true,
              message: 'Please enter your invite code',
            },
          })}
          mandatory
          errors={errors}
          placeholder='D12FSBYT'
          label='Invite Code'
        />

        <div className='mt-4 flex justify-center space-x-4'>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ClientOnboarding;
