import classNames from 'classnames';
import React from 'react';

import { UserType } from '@/types';

const AuthNavbar: React.FC<{
  authUser: UserType;
  handleAuthUserUpdate: (user: UserType) => void;
}> = ({ authUser, handleAuthUserUpdate }) => {
  return (
    <div className='flex justify-between bg-white'>
      <div
        onClick={() => handleAuthUserUpdate('client')}
        className={classNames(
          'w-full cursor-pointer py-6 text-center text-2xl font-semibold',
          authUser === 'client'
            ? 'bg-gray rounded-tr-3xl'
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
            ? 'bg-gray rounded-tl-3xl'
            : 'rounded-bl-3xl bg-white'
        )}
      >
        Auditor
      </div>
    </div>
  );
};

export default AuthNavbar;
