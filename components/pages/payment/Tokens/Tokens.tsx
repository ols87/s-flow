import { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Metaplex } from '@metaplex-foundation/js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useRecoilState } from 'recoil';

import { DEFAULT_URI, paymentFormStore, updatePaymentFormStore } from '../Form';
import { SelectedPaymentTokenComponent, PaymentTokenComponent } from './components';
import { ParsedToken, PaymentToken } from './types';
import { styles } from './css';
import { SOL_Token, WSOL_Token } from './models';

export function PaymentTokensComponent() {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const [state, update] = useRecoilState(paymentFormStore);

  function updateModel(key: string, value: any) {
    update(updatePaymentFormStore({ [key]: value }));
  }

  async function getTokenList() {
    if (!wallet || !wallet.adapter.publicKey) return;

    const pubKey = new PublicKey(wallet.adapter.publicKey as PublicKey);
    const metaplex = new Metaplex(connection);

    const balance = await connection.getBalance(pubKey);

    const sol = { ...SOL_Token, balance: parseFloat((balance / 10 ** 9).toFixed(4)) };

    var tokenList = [sol];

    updateModel('selected', sol);
    updateModel('tokens', [sol]);

    const tokens = await connection.getParsedTokenAccountsByOwner(pubKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    tokens.value.forEach(async (token: ParsedToken) => {
      const tokenAmount = token.account.data.parsed.info.tokenAmount.uiAmount;

      if (!tokenAmount) return;

      if (token.account.data.parsed.info.mint === WSOL_Token.address) {
        tokenList = [
          ...tokenList,
          {
            ...WSOL_Token,
            balance: tokenAmount,
          },
        ];

        return;
      }

      const tokenData = await metaplex.nfts().findByToken({
        token: token.pubkey,
      });

      tokenList = [
        ...tokenList,
        {
          pubkey: token.pubkey.toString(),
          address: tokenData.mint.address.toString(),
          name: tokenData.name,
          symbol: tokenData.symbol,
          decimals: tokenData.mint.decimals,
          uri: tokenData.uri || DEFAULT_URI,
          balance: tokenAmount,
        },
      ];

      updateModel('tokens', tokenList);
    });
  }

  useEffect(() => {
    getTokenList();
  }, [wallet?.adapter?.publicKey]);

  return (
    <Listbox value={state.selected}>
      <div className="relative mt-1">
        <Listbox.Button className={styles.button} data-test="tokens-selected">
          <SelectedPaymentTokenComponent token={state.selected} />
        </Listbox.Button>

        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className={styles.options}>
            {state.tokens.map((token: PaymentToken, index: number) => (
              <Listbox.Option
                key={index}
                className={({ active }) => `${styles.option} ${active ? 'bg-sky-50/[0.03]' : ''}`}
                value={token}
                onClick={() => updateModel('selected', state.tokens[index])}
                data-test={`token-option`}
              >
                <PaymentTokenComponent token={token} />
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
