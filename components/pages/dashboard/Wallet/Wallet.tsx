import { DropdownComponent } from '@components/common/Dropdown';
import { ModalComponent } from '@components/common/Modal';
import { StreamModalComponent } from '@components/common/StreamModal';

import { styles } from './css';
interface BalanceProps {
  label: string;
  amount: string;
}

const Balance = (props: BalanceProps) => {
  return (
    // <div> required for flexbox.
    <div>
      <p>{props.label}</p>
      <p className={styles.amount}>$ {props.amount}</p>
    </div>
  );
};

const StreamModalLink = () => {
  return (
    <a className={`${styles.link} text-lg `} data-test="wallet-unlocks-link">
      Create a new stream
    </a>
  );
};

export function DashWalletComponent() {
  const cardStyle = `card ${styles.card}`;

  return (
    <>
      <div className="prose">
        <h2 className={styles.title}>Overview</h2>
      </div>

      <div className={`${styles.layout}`} data-test="wallet-card-balance">
        <div className={cardStyle}>
          <Balance label="Wallet Balance" amount="1,538.86" />
          <a className={`${styles.withdraw} ${styles.link}`} data-test="wallet-balance-button">
            Bank Withdraw
          </a>
        </div>

        <div className={cardStyle} data-test="wallet-card-unlockable">
          <Balance label="Unlockable Value" amount="292.35" />

          <div className={styles.unlockable}>
            <DropdownComponent id="unlockable-user" items={['Recipient', 'Sender', 'All']} />
            <span className="w-2 inline-block"></span>
            <DropdownComponent id="unlockable-range" items={['2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year']} />
          </div>
        </div>

        <div className={cardStyle} data-test="wallet-card">
          <Balance label="Withdrawable Amount" amount="722.47" />
        </div>

        <div className="card" data-test="wallet-card-unlocks">
          <div className={styles.unlocks}>
            <h3 className={styles.unlocksTitle}>No Upcoming Unlocks</h3>
            <p>Your unlock streams will appear here.</p>
            <ModalComponent
              id="dash-new-stream"
              title="Create New Stream"
              trigger={<StreamModalLink />}
              body={<StreamModalComponent id="dash-new-stream" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
