import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ToastComponent, toastStore, updateToastStore } from '@components/common/Toast';
import { PaymentFormComponent, paymentFormStore } from '@components/pages/payment/Form';

import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';

import { Cluster, getBN, StreamClient } from '@streamflow/stream';
import { styles } from './css';
import { useState } from 'react';
import Link from 'next/link';

export function PaymentComponent() {
  const { connection } = useConnection();
  const { wallet } = useWallet();
  const anchorWallet = useAnchorWallet();
  const [tx, setTx]: any = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const state = useRecoilValue(paymentFormStore);

  const updateWalletToast = useSetRecoilState(toastStore('required-wallet'));
  const updateErrorToast = useSetRecoilState(toastStore('payment-error'));

  const submit = async () => {
    if (!wallet || !wallet.adapter?.publicKey) {
      updateWalletToast(updateToastStore({ isOpen: true }));
      return;
    }

    if (!state.selected || !state.releaseAmount) return;

    const start = Math.round(Date.now() / 1000) + 60;

    const recipients = [
      {
        name: 'Oli',
        recipient: '4YBWRG3CvqobSagQpLaLqTJJdeYghw19Aop5FSWEhxTd',
        depositedAmount: getBN(+state.releaseAmount, state.selected.decimals),
        cliffAmount: getBN(0, state.selected.decimals),
        amountPerPeriod: getBN(+state.releaseAmount / 100, state.selected.decimals),
      },
    ];

    const createStreamParams = {
      sender: anchorWallet as AnchorWallet,
      recipientsData: recipients,
      mint: state.selected.address,
      start: start,
      period: state.releaseFrequencyPeriod * state.releaseFrequencyCounter,
      cliff: start,
      canTopup: true,
      cancelableBySender: true,
      cancelableByRecipient: false,
      transferableBySender: true,
      transferableByRecipient: false,
      automaticWithdrawal: false,
      partner: null,
      isNative: state.selected.symbol === 'SOL',
    };

    try {
      const streamClient = new StreamClient(connection.rpcEndpoint, Cluster.Devnet, 'confirmed');

      const _tx = await streamClient.createMultiple(createStreamParams);

      setConfirmed(_tx.errors.length < 1);

      setTx(_tx);

      if (_tx.errors.length > 0) {
        updateErrorToast(updateToastStore({ isOpen: true }));
        console.log(_tx);
      }
    } catch (exception) {
      updateErrorToast(updateToastStore({ isOpen: true }));
      console.log(exception);
    }
  };

  if (confirmed) {
    return (
      <div className={styles.wrapper}>
        <div className="prose text-sky-50">
          <h2 className={styles.title}>Stream Created</h2>
          <p>
            <Link className="text-sky-500" target="_blank" href={`https://solscan.io/tx/${tx.txs}?cluster=devnet`}>
              Check on Solscan
            </Link>
          </p>
          <p>Can I haz job?</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastComponent id="required-wallet" title="Error" text="Please connect your wallet!" status="error" />

      <ToastComponent
        id="payment-error"
        title="Error"
        text="Transaction error, please try again and check the console"
        status="error"
      />

      <div className={styles.wrapper}>
        <div className="prose">
          <h2 className={styles.title}>Payment</h2>
        </div>

        <PaymentFormComponent />

        <div className="mt-6">
          <button className="btn" type="button" onClick={submit}>
            Create Stream
          </button>
        </div>
      </div>
    </>
  );
}
