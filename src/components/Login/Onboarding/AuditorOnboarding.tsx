import { Divider, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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

const Div = styled('div')`
  display: flex;
  gap: 1rem;
  padding-bottom: 6px;
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

const AuditorOnboarding = () => {
  const {
    web3auth,
    updateUserInfo,
    handleLogout,
    setIsAuthenticated,
    handleOnboardedUser,
  } = useAppContext();
  // use react-hook-forms later
  const [userOnboardingDetails, setUserOnboardingDetails] = useState({
    fullName: '',
    github: '',
    tariff: 0,
    twitter: '',
    codearena: '',
    sherlock: '',
    inviteCode: '',
  });

  const { push } = useRouter();

  const handleUserLogout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      defaultErrorMessage(error);
    }
  };

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
    <div className=' space-y-3'>
      <BackButton onClick={handleLogout}>
        <ArrowLeft />
      </BackButton>
      <div className='border-b border-b-gray-400 '>
        <div className='text-2xl font-bold'>Contact details</div>
        <Typography variant='subtitle1'>Enter your details to login</Typography>
      </div>
      <Divider />
      <Input
        onChange={(e) => handleFormUpdate(e)('fullName')}
        id='fullName'
        value={userOnboardingDetails.fullName}
        placeholder='John Doe'
        label='Full Name'
        icon={<Person />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('github')}
        id='github'
        value={userOnboardingDetails.github}
        placeholder='@codejohndoe'
        label='Github'
        icon={<Github />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('tariff')}
        id='tariff'
        value={userOnboardingDetails.tariff}
        placeholder='$5000'
        label='Weekly Cost'
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('twitter')}
        id='twitter'
        value={userOnboardingDetails.twitter}
        placeholder='@viraljohndoe'
        label='Twitter'
        icon={<Twitter />}
      />
      <Div>
        <Input
          onChange={(e) => handleFormUpdate(e)('sherlock')}
          id='sherlock'
          value={userOnboardingDetails.sherlock}
          placeholder='@detectiveJohnDoe'
          label='Sherlock'
          icon={<Sherlock />}
        />
        <Input
          onChange={(e) => handleFormUpdate(e)('codearena')}
          id='codearena'
          value={userOnboardingDetails.codearena}
          placeholder='@codingJohnDoe'
          label='Codearena'
        />
      </Div>
      <Divider />
      <Input
        onChange={(e) => handleFormUpdate(e)('inviteCode')}
        id='inviteCode'
        value={userOnboardingDetails.inviteCode}
        placeholder='1234SDFS'
        label='Invite Code'
      />

      <div className='flex justify-center space-x-4'>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default AuditorOnboarding;
