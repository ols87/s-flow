import React from 'react';

import { DashStreamsComponent } from '@components/pages/dashboard/Streams';
import { DashWalletComponent } from '@components/pages/dashboard/Wallet';

import { styles } from './css';

export function DashboardPage() {
  return (
    <div className={styles.wrapper}>
      <DashWalletComponent />
      <DashStreamsComponent />
    </div>
  );
}
