import React from 'react';
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

import { ModalComponent } from '@components/common/Modal';
import { StreamModalComponent } from '@components/common/StreamModal';

import { styles } from './css';

export const fullLogo = 'https://streamflow.finance/imgs/streamflow-logo-desktop.PNG';
export const smallLogo = 'https://app.streamflow.finance/static/media/logo.c4294b7c.png';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const ModalButton = () => {
  return (
    <button className={`btn ${styles.payment}`} data-test="header-stream">
      <Icon icon="ph:circles-three-plus" className={styles.paymentIcon}></Icon>
      <span>Create Stream</span>
    </button>
  );
};

export function HeaderComponent() {
  return (
    <header className={styles.header} data-test="header">
      <picture className={styles.logo} data-test="header-logo">
        <source media="(min-width: 900px)" srcSet={fullLogo} />
        <source srcSet={smallLogo} />
        <img src={smallLogo} />
      </picture>

      <div className={styles.actions} data-test="header-actions">
        <ModalComponent
          id="header-create"
          title="Create New Stream"
          trigger={<ModalButton />}
          body={<StreamModalComponent id="header-create" />}
        />

        <span className={`${styles.wallet} connect-wallet`} data-test="header-wallet">
          <WalletMultiButtonDynamic />
        </span>
      </div>
    </header>
  );
}
