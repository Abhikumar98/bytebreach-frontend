import { Divider, styled, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { defaultErrorMessage } from '@/lib/helper';

import ArrowLeft from '@/assets/arrowLeft.svg';
import Github from '@/assets/github.svg';
import Person from '@/assets/person.svg';
import Sherlock from '@/assets/sherlock.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import RangeSlider from '@/atoms/RangeSlider';
import { useAppContext } from '@/context';
import { postAuditorProfile } from '@/services';

import { AppRoutes, IAuditorOnboardingForm, IAuditorProfile } from '@/types';

const StyledInputValue = styled('div')`
  input {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  border-radius: 15rem;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;

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

const AuditorOnboarding = ({ backToLogin }: { backToLogin: () => void }) => {
  const { handleLogout } = useAppContext();

  const handleBackButton = () => {
    backToLogin();
    handleLogout();
  };

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
      codearena: '',
      sherlock: '',
      inviteCode: '',
    },
  });
  const [sliderValue, setSliderValue] = React.useState<number[]>([100, 300]);

  const [isLoading, setIsLoading] = React.useState(false);

  const { push } = useRouter();

  const handleFormSubmit = async (values: IAuditorOnboardingForm) => {
    try {
      setIsLoading(true);
      const auditorProfileRequest: Partial<IAuditorProfile> = {
        first_name: values.fullName.split(' ')[0],
        last_name: values.fullName.split(' ')[1],
        github_url: values.github,
        codeareana_url: values.codearena.length ? values.codearena : undefined,
        sherlock_url: values.sherlock.length ? values.sherlock : undefined,
        min_weekly_cost: sliderValue[0],
        max_weekly_cost: sliderValue[1],
      };

      await postAuditorProfile(auditorProfileRequest);
      push(AppRoutes.Homepage);
    } catch (error) {
      defaultErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <BackButton onClick={handleBackButton}>
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
        <div>
          <RangeSlider
            min={10}
            max={10000}
            step={10}
            mandatory
            label='Weekly cost'
            value={sliderValue}
            setValue={setSliderValue}
          />
          <div className='flex items-center space-x-2'>
            <Typography color={theme.palette?.text?.secondary}>
              <StyledInputValue>
                $
                <input
                  className='w-20 border-none text-base outline-none'
                  value={sliderValue[0]}
                  onChange={(e) => {
                    setSliderValue([Number(e.target.value), sliderValue[1]]);
                  }}
                />
              </StyledInputValue>
            </Typography>
            <span>-</span>
            <Typography color={theme.palette?.text?.secondary}>
              <StyledInputValue>
                $
                <input
                  className='w-20 border-none text-base outline-none'
                  value={sliderValue[1]}
                  onChange={(e) => {
                    setSliderValue([sliderValue[0], Number(e.target.value)]);
                  }}
                />
              </StyledInputValue>
            </Typography>
          </div>
        </div>
        {/* <Input
          {...register('twitter')}
          placeholder='@viraljohndoe'
          label='Twitter'
          icon={<Twitter />}
        /> */}
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
          <Button isLoading={isLoading} type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuditorOnboarding;
