import { Divider, styled, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import Web3 from 'web3';

import { defaultErrorMessage } from '@/lib/helper';

import ArrowLeft from '@/assets/arrowLeft.svg';
import Github from '@/assets/github.svg';
import Person from '@/assets/person.svg';
import Sherlock from '@/assets/sherlock.svg';
import Twitter from '@/assets/twitter.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

import { IAuditorOnboardingForm } from '@/types';

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

const AuditorOnboarding = () => {
  const {
    web3auth,
    updateUserInfo,
    handleLogout,
    setIsAuthenticated,
    handleOnboardedUser,
  } = useAppContext();

  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuditorOnboardingForm>({
    defaultValues: {
      fullName: '',
      github: '',
      tariff: 0,
      twitter: '',
      codearena: '',
      sherlock: '',
      inviteCode: '',
    },
  });

  const { push } = useRouter();

  const handleFormSubmit = async (values: IAuditorOnboardingForm) => {
    try {
      console.log({ values });

      const web3 = new Web3(web3auth?.provider as any);
      const accounts = await web3.eth.getAccounts();

      handleOnboardedUser(accounts?.[0] ?? '');
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  return (
    <div className='space-y-4'>
      <BackButton onClick={handleLogout}>
        <ArrowLeft />
      </BackButton>
      <div className='border-b border-b-gray-400 '>
        <div className='text-2xl font-bold'>Contact details</div>
        <Typography variant='subtitle1'>Enter your details to login</Typography>
      </div>
      <Divider />
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
          {...register('github', {
            required: {
              value: true,
              message: 'Please enter your github username',
            },
          })}
          mandatory
          errors={errors}
          placeholder='@codejohndoe'
          label='Github'
          icon={<Github />}
        />
        <Input
          {...register('tariff', {
            required: {
              value: true,
              message: 'Please enter your weekly cost',
            },
            min: {
              value: 1,
              message: 'Weekly cost cannot be 0',
            },
            valueAsNumber: true,
          })}
          type='number'
          errors={errors}
          mandatory
          placeholder='$5000'
          label='Weekly Cost'
        />
        <Input
          {...register('twitter')}
          placeholder='@viraljohndoe'
          label='Twitter'
          icon={<Twitter />}
        />
        <div className='flex w-full space-x-6'>
          <div className='w-full'>
            <Input
              {...register('sherlock')}
              placeholder='@detectiveJohnDoe'
              label='Sherlock'
              icon={<Sherlock />}
              fullWidth
              tooltipMessage='We will import your details from Code Arena.'
            />
          </div>
          <div className='w-full'>
            <Input
              {...register('codearena')}
              placeholder='@codingJohnDoe'
              label='Codearena'
              fullWidth
              tooltipMessage='We will import your details from Code Arena.'
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
          placeholder='1234SDFS'
          label='Invite Code'
        />

        <div className='mt-4 flex justify-center space-x-4'>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AuditorOnboarding;
