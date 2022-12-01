import { Icon } from '@iconify/react';
import { styles } from '../css';
import { PaymentToken } from '../types';

export function SelectedPaymentTokenComponent(props: { token?: PaymentToken }) {
  const { token } = props;

  return (
    <>
      <div className={styles.buttonLabel}>
        <img src={token?.uri} alt={token?.name} className={styles.tokenLogo} />
        {token?.symbol}
      </div>

      <span className={styles.buttonCaret}>
        <Icon icon="ph:caret-down" />
      </span>
    </>
  );
}
