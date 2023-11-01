import { Divider, styled, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
  const theme = useTheme();

  const { web3auth, handleOnboardedUser, handleLogout } = useAppContext();

  // use react-hook-forms later
  const [userOnboardingDetails, setUserOnboardingDetails] = useState({
    fullName: '',
    companyName: '',
    website: '',
    twitter: '',
    github: '',
    inviteCode: '',
  });

  const handleUserLogout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  const { push } = useRouter();

  const handleFormUpdate =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (key: string) => {
      setUserOnboardingDetails((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleFormSubmit = async () => {
    try {
      // TODO: add form validation

      // const response = await fetch('/api/login');
      // const data = await response.json();

      const web3 = new Web3(web3auth?.provider as any);
      const accounts = await web3.eth.getAccounts();

      handleOnboardedUser(accounts?.[0] ?? '');
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

  return (
    <div className=' space-y-4'>
      <BackButton onClick={handleLogout}>
        <ArrowLeft />
      </BackButton>
      <div className='border-b border-b-gray-400 pb-4'>
        <div className='text-2xl font-bold'>Contact details</div>
        <Typography variant='subtitle1'>Enter your details to login</Typography>
      </div>
      <Input
        onChange={(e) => handleFormUpdate(e)('fullName')}
        id='fullName'
        value={userOnboardingDetails.fullName}
        placeholder='John Doe'
        label='Full Name'
        icon={<Person />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('companyName')}
        id='companyName'
        value={userOnboardingDetails.companyName}
        placeholder='Google'
        label='Company Name'
        icon={<Building />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('website')}
        id='website'
        value={userOnboardingDetails.website}
        placeholder='www.google.com'
        label='Website'
        icon={<Envelope />}
      />
      <div className='flex space-x-6'>
        <Input
          onChange={(e) => handleFormUpdate(e)('twitter')}
          id='twitter'
          value={userOnboardingDetails.twitter}
          placeholder='@johndoe'
          label='Twitter'
          icon={<Twitter />}
        />
        <Input
          onChange={(e) => handleFormUpdate(e)('github')}
          id='github'
          value={userOnboardingDetails.github}
          placeholder='@coderjohndoe'
          label='Github'
          icon={<Github />}
        />
      </div>

      <Divider />

      <Input
        onChange={(e) => handleFormUpdate(e)('inviteCode')}
        id='inviteCode'
        value={userOnboardingDetails.inviteCode}
        placeholder='D12FSBYT'
        label='Invite Code'
      />

      <div className='flex justify-center space-x-4'>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ClientOnboarding;
