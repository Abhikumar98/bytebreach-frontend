import { SimplePaletteColorOptions, styled } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

import { UserType } from '@/types';

const StyledAuthNavbarContainer = styled('div')`
  color: ${({ theme }) =>
    (theme.palette?.secondary as SimplePaletteColorOptions)?.contrastText};
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette?.background.default};

  .active-underline {
    position: relative;
    &:after {
      content: '';
      background: ${({ theme }) =>
        (theme.palette?.secondary as SimplePaletteColorOptions).contrastText};
      position: absolute;
      z-index: 1;
      height: 2px;
      border-radius: 2rem;
      width: 50%;
      bottom: 0;
      left: 25%;
    }
  }
`;

const AuthNavbar: React.FC<{
  authUser: UserType;
  handleAuthUserUpdate: (user: UserType) => void;
}> = ({ authUser, handleAuthUserUpdate }) => {
  return (
    <StyledAuthNavbarContainer>
      <div
        onClick={() => handleAuthUserUpdate('client')}
        className={classNames(
          'relative w-full cursor-pointer pb-2 pt-6 text-center text-2xl font-semibold',
          authUser === 'client'
            ? 'active-underline bg-gray  rounded-tr-3xl'
            : 'rounded-br-3xl bg-white'
        )}
      >
        Client
      </div>
      <div
        onClick={() => handleAuthUserUpdate('auditor')}
        className={classNames(
          'w-full cursor-pointer pb-2 pt-6 text-center text-2xl font-semibold',
          authUser === 'auditor'
            ? 'active-underline bg-gray rounded-tl-3xl'
            : 'rounded-bl-3xl bg-white'
        )}
      >
        Auditor
      </div>
    </StyledAuthNavbarContainer>
  );
};

export default AuthNavbar;
