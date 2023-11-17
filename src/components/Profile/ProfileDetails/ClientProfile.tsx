import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import InlineEdit from '@/components/Profile/ProfileDetails/InlineEdit';

import Button from '@/atoms/Button';
import { useAppContext } from '@/context';
import { postClientProfile } from '@/services';

import { IUserProfile } from '@/types';

const ClientProfile = () => {
  const { userInfo, handleFetchUser } = useAppContext();

  const [clientInfo, setClientInfo] = React.useState<IUserProfile | null>(null);

  // loader
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setClientInfo(userInfo as IUserProfile);
  }, [userInfo]);

  const handlePartialClientStateUpdate = (
    key: keyof IUserProfile,
    value: string
  ) => {
    if (!clientInfo) return;

    setClientInfo({
      ...clientInfo,
      [key]: value,
    });
  };

  const handleCancel = () => {
    setClientInfo(userInfo as IUserProfile);
  };

  const handleSave = async () => {
    try {
      if (!clientInfo) return;

      setLoading(true);

      await postClientProfile(clientInfo);
      await handleFetchUser('client');
    } catch (error) {
      defaultErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='mb-6 mt-4 flex w-full gap-4'>
        <InlineEdit
          label='First name'
          value={clientInfo?.first_name ?? ''}
          onSave={(value) =>
            handlePartialClientStateUpdate('first_name', value)
          }
        />
        <InlineEdit
          label='Last name'
          value={clientInfo?.last_name ?? ''}
          onSave={(value) => handlePartialClientStateUpdate('last_name', value)}
        />
      </div>
      <div className='mb-6 mt-4 flex w-full gap-4'>
        <InlineEdit
          label='Github'
          value={clientInfo?.github_url ?? ''}
          onSave={(value) =>
            handlePartialClientStateUpdate('github_url', value)
          }
        />
        <InlineEdit
          label='Twitter'
          value={clientInfo?.twitter_url ?? ''}
          onSave={(value) =>
            handlePartialClientStateUpdate('twitter_url', value)
          }
        />
      </div>

      <div className='mt-8 flex items-center justify-end space-x-4'>
        <Button onClick={handleCancel} variant='outlined'>
          Cancel
        </Button>
        <Button isLoading={loading} onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};

export default ClientProfile;
