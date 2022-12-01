import { useRecoilState } from 'recoil';
import { PaymentTokensComponent } from '../Tokens';
import { paymentFormStore, updatePaymentFormStore } from './store';

import { styles } from './css';

export function PaymentFormComponent() {
  const [state, update] = useRecoilState(paymentFormStore);

  function updateModel(key: string, value: any) {
    update(updatePaymentFormStore({ [key]: value }));
  }

  return (
    <form>
      <div className="w-full" data-test="payment-tokens">
        <label>Token</label>
        <PaymentTokensComponent />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Release Amount</label>
          <input
            type="text"
            className={styles.input}
            value={state.releaseAmount}
            onChange={(event) => updateModel('releaseAmount', +event.target.value)}
            data-test="payment-amount"
          />
        </div>

        <div className={styles.field}>
          <label>Release Frequency</label>
          <div className="flex">
            <input
              type="number"
              placeholder="0"
              className={`${styles.input} mr-3`}
              value={state.releaseFrequencyCounter}
              onChange={(event) => updateModel('releaseFrequencyCounter', +event.target.value)}
              data-test="payment-frequency-counter"
            />
            <select
              className={styles.input}
              value={state.releaseFrequencyPeriod}
              onChange={(event) => updateModel('releaseFrequencyPeriod', +event.target.value)}
              data-test="payment-frequency-period"
            >
              <option value="1">second</option>
              <option value="60">minute</option>
              <option value="3600">hour</option>
              <option value={3600 * 24}>day</option>
              <option value={3600 * 24 * 7}>week</option>
              <option value={3600 * 24 * 30}>month</option>
              <option value={3600 * 24 * 365}>year</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Start Date</label>
          <input
            type="text"
            placeholder="0"
            className={styles.input}
            value={state.startDate}
            onChange={(event) => updateModel('startDate', event.target.value)}
            data-test="payment-start-date"
          />
        </div>

        <div className={styles.field}>
          <label>Start Time</label>
          <input
            type="text"
            placeholder="0"
            className={styles.input}
            value={state.startTime}
            onChange={(event) => updateModel('startTime', event.target.value)}
            data-test="payment-start-time"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Who Can Transfer Contract?</label>
          <select
            className={styles.input}
            value={state.whoCanTransfer}
            onChange={(event) => updateModel('whoCanTransfer', event.target.value)}
            data-test="payment-who-transfer"
          >
            <option value="recipient">Only Recipient</option>
            <option value="sender">Only Sender</option>
            <option value="both">Both</option>
            <option value="neither">Neither</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Who Can Cancel Contract?</label>
          <select
            className={styles.input}
            value={state.whoCanCancel}
            onChange={(event) => updateModel('whoCanCancel', event.target.value)}
            data-test="payment-who-cancel"
          >
            <option value="recipient">Only Recipient</option>
            <option value="sender">Only Sender</option>
            <option value="both">Both</option>
            <option value="neither">Neither</option>
          </select>
        </div>
      </div>
    </form>
  );
}
