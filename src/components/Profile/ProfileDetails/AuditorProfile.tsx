import React, { useEffect } from 'react';

import { defaultErrorMessage } from '@/lib/helper';

import InlineEdit from '@/components/Profile/ProfileDetails/InlineEdit';

import Button from '@/atoms/Button';
import { useAppContext } from '@/context';
import { postAuditorProfile } from '@/services';

import { IAuditorProfile } from '@/types';

const AuditorProfile = () => {
  const { userInfo, handleFetchUser } = useAppContext();

  const [auditorInfo, setAuditorInfo] = React.useState<IAuditorProfile | null>(
    null
  );

  // loader
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setAuditorInfo(userInfo as IAuditorProfile);
  }, [userInfo]);

  const handlePartialAuditorStateUpdate = (
    key: keyof IAuditorProfile,
    value: string
  ) => {
    if (!auditorInfo) return;

    setAuditorInfo({
      ...auditorInfo,
      [key]: value,
    });
  };

  const handleCancel = () => {
    setAuditorInfo(userInfo as IAuditorProfile);
  };

  const handleSave = async () => {
    try {
      if (!auditorInfo) return;

      setLoading(true);

      await postAuditorProfile(auditorInfo);
      await handleFetchUser('auditor');
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
          value={auditorInfo?.first_name ?? ''}
          onSave={(value) =>
            handlePartialAuditorStateUpdate('first_name', value)
          }
        />
        <InlineEdit
          label='Last name'
          value={auditorInfo?.last_name ?? ''}
          onSave={(value) =>
            handlePartialAuditorStateUpdate('last_name', value)
          }
        />
      </div>
      <div className='mb-6 mt-4 flex w-full gap-4'>
        <InlineEdit
          label='Github'
          value={auditorInfo?.github_url ?? ''}
          onSave={(value) =>
            handlePartialAuditorStateUpdate('github_url', value)
          }
        />
        <InlineEdit
          label='Sherlock'
          value={auditorInfo?.sherlock_url ?? ''}
          onSave={(value) =>
            handlePartialAuditorStateUpdate('sherlock_url', value)
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

export default AuditorProfile;
