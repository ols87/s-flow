import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js';

export interface PaymentToken {
  pubkey?: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance?: number;
  uri?: string;
}

export interface ParsedToken {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}
