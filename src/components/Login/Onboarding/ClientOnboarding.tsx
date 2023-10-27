import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Web3 from 'web3';

import { defaultErrorMessage } from '@/lib/helper';

import Building from '@/assets/building.svg';
import Envelope from '@/assets/envelope.svg';
import Github from '@/assets/github.svg';
import Person from '@/assets/person.svg';
import Twitter from '@/assets/twitter.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

const ClientOnboarding = () => {
  const { web3auth, handleOnboardedUser, handleLogout } = useAppContext();

  // use react-hook-forms later
  const [userOnboardingDetails, setUserOnboardingDetails] = useState({
    fullName: '',
    companyName: '',
    website: '',
    twitter: '',
    github: '',
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
    (e: React.ChangeEvent<HTMLInputElement>) => (key: string) => {
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
      <div className='border-b border-b-gray-400 pb-4'>
        <div className='text-2xl font-bold'>Contact details</div>
        <div className=' text-gray-500'>Enter your details to login</div>
      </div>
      <Input
        onChange={(e) => handleFormUpdate(e)('fullName')}
        value={userOnboardingDetails.fullName}
        placeholder='John Doe'
        label='Full Name'
        icon={<Person />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('companyName')}
        value={userOnboardingDetails.companyName}
        placeholder='Google'
        label='Company Name'
        icon={<Building />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('website')}
        value={userOnboardingDetails.website}
        placeholder='www.google.com'
        label='Website'
        icon={<Envelope />}
      />
      <div className='flex space-x-6'>
        <Input
          onChange={(e) => handleFormUpdate(e)('twitter')}
          value={userOnboardingDetails.twitter}
          placeholder='@johndoe'
          label='Twitter'
          icon={<Twitter />}
        />
        <Input
          onChange={(e) => handleFormUpdate(e)('github')}
          value={userOnboardingDetails.github}
          placeholder='@coderjohndoe'
          label='Github'
          icon={<Github />}
        />
      </div>
      <div className='flex justify-center space-x-4'>
        <Button onClick={handleFormSubmit} variant='primary'>
          Submit
        </Button>
        <Button onClick={handleUserLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default ClientOnboarding;
