import React from 'react';
import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';

import { AppLayout } from '../layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  );
}
