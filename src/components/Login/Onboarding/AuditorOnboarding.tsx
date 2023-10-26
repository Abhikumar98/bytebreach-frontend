import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { setInLocalStorage } from '@/lib/helper';

import Building from '@/assets/building.svg';
import Envelope from '@/assets/envelope.svg';
import Person from '@/assets/person.svg';
import Twitter from '@/assets/twitter.svg';
import Button from '@/atoms/Button';
import Input from '@/atoms/Input';
import { useAppContext } from '@/context';

const AuditorOnboarding = () => {
  const { web3auth, updateUserInfo } = useAppContext();
  // use react-hook-forms later
  const [userOnboardingDetails, setUserOnboardingDetails] = useState({
    fullName: '',
    twitter: '',
    codearena: '',
    sherlock: '',
  });

  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      await web3auth?.logout();
      updateUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormUpdate =
    (e: React.ChangeEvent<HTMLInputElement>) => (key: string) => {
      setUserOnboardingDetails((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleFormSubmit = async () => {
    try {
      // TODO: add form validation

      // const response = await fetch('/api/login');
      // const data = await response.json();

      setInLocalStorage('authenticated', 'true');
      push('/');
    } catch (error) {
      console.error(error);
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
        onChange={(e) => handleFormUpdate(e)('twitter')}
        value={userOnboardingDetails.twitter}
        placeholder='Google'
        label='Company Name'
        icon={<Building />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('codearena')}
        value={userOnboardingDetails.codearena}
        placeholder='www.google.com'
        label='Website'
        icon={<Envelope />}
      />
      <Input
        onChange={(e) => handleFormUpdate(e)('sherlock')}
        value={userOnboardingDetails.sherlock}
        placeholder='@johndoe'
        label='Twitter'
        icon={<Twitter />}
      />
      <div className='flex justify-center space-x-4'>
        <Button onClick={handleFormSubmit}>Submit</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default AuditorOnboarding;
