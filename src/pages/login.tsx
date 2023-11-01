import styled from '@emotion/styled';
import React from 'react';

import AuthContainer from '@/components/Login/AuthContainer';

const StyledLoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  justify-content: space-between;

  .auth-container {
    max-width: 38rem;
    width: 100%;

    align-self: center;
    justify-self: center;
    margin: auto;
  }
`;

const StyledImageContainer = styled.img`
  width: calc(100% / 3);
  justify-self: end;
  width: 32rem;
`;

const Auth = () => {
  return (
    <>
      <StyledLoginContainer>
        <div className='auth-container'>
          <AuthContainer />
        </div>
        {/* <AuthBranding /> */}
        <StyledImageContainer src='/images/login.png' />
      </StyledLoginContainer>
    </>
  );
};

export default Auth;
