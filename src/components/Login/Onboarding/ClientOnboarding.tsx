import { Divider, styled, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

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
import { postClientProfile } from '@/services';

import { AppRoutes, IClientOnboardingForm, IUserProfile } from '@/types';
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

const ClientOnboarding = ({ backToLogin }: { backToLogin: () => void }) => {
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

  const { handleLogout } = useAppContext();

  const handleBackButton = () => {
    backToLogin();
    handleLogout();
  };

  const { push } = useRouter();

  const handleFormSubmit = async (values: IClientOnboardingForm) => {
    try {
      const clientProfileRequest: Partial<IUserProfile> = {
        first_name: values.fullName.split(' ')[0],
        last_name: values.fullName.split(' ')[1] ?? '',
        company_name: values.companyName,
        website_url: values.website.length ? values.website : undefined,
        twitter_url: values.twitter.length ? values.twitter : undefined,
        github_url: values.github.length ? values.github : undefined,
      };

      console.log({ clientProfileRequest });

      await postClientProfile(clientProfileRequest);

      push(AppRoutes.Homepage);
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  console.log({ errors });

  return (
    <div className=' space-y-4'>
      <BackButton onClick={handleBackButton}>
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
