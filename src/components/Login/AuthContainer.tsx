import classNames from 'classnames';
import React from 'react';

import AuditorAuth from '@/components/Login/AuditorAuth';
import ClientAuth from '@/components/Login/ClientAuth';

const AuthContainer = () => {
  const [authUser, setAuthUser] = React.useState<'client' | 'auditor'>(
    'client'
  );

  const handleAuthUserUpdate = (user: 'client' | 'auditor') => {
    setAuthUser(user);
  };

  return (
    <div className=' w-[41rem] overflow-hidden rounded-3xl'>
      <div className='flex justify-between bg-white'>
        <div
          onClick={() => handleAuthUserUpdate('client')}
          className={classNames(
            'w-full cursor-pointer py-6 text-center text-2xl font-semibold',
            authUser === 'client'
              ? 'rounded-tr-3xl bg-gray-200'
              : 'rounded-br-3xl bg-white'
          )}
        >
          Client
        </div>
        <div
          onClick={() => handleAuthUserUpdate('auditor')}
          className={classNames(
            'w-full cursor-pointer py-6 text-center text-2xl font-semibold',
            authUser === 'auditor'
              ? 'rounded-tl-3xl bg-gray-200'
              : 'rounded-bl-3xl bg-white'
          )}
        >
          Auditor
        </div>
      </div>
      <div className='h-full bg-gray-200 px-16 py-6'>
        {authUser === 'client' ? <ClientAuth /> : <AuditorAuth />}
      </div>
    </div>
  );
};

export default AuthContainer;
