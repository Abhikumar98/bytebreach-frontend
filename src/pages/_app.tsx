import { AppProps } from 'next/app';

import '@/styles/globals.css';

import Wrapper from '@/components/Dashboard/Wrapper';

import AppContext from '@/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </AppContext>
  );
}

export default MyApp;
