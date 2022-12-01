import { styles } from '../css';
import { PaymentToken } from '../types';

export function PaymentTokenComponent(props: { token: PaymentToken }) {
  const { token } = props;

  return (
    <div className={styles.optionLabel}>
      <div className="flex items-center">
        <img src={token.uri} alt="" className={styles.tokenLogo} />

        <div>
          <div className="font-medium">{token.symbol}</div>
          <div>{token.name}</div>
        </div>
      </div>

      <div className="text-right">
        <div>{token.balance}</div>
        <div>{token.symbol}</div>
      </div>
    </div>
  );
}
