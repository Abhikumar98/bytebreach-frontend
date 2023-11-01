import { AppProps } from 'next/app';

import '@/styles/globals.css';

import Wrapper from '@/components/Dashboard/Wrapper';

import AppContext from '@/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Wrapper>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        {/* move to _document.js */}
        <link
          href='https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&family=Inter&family=Poppins:wght@400;500&family=Roboto:wght@100&display=swap'
          rel='stylesheet'
        />
        <Component {...pageProps} />
      </Wrapper>
    </AppContext>
  );
}

export default MyApp;
