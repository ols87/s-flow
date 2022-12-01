import { PaymentToken } from '../types';

export const SOL_Token: PaymentToken = {
  pubkey: '2RmhFKwKT5cjrQHbgLfGFyjZ8g6JjF1D69Sks7MVvyRC',
  address: 'So11111111111111111111111111111111111111112',
  name: 'Solana',
  symbol: 'SOL',
  decimals: 9,
  balance: 0,
  uri: 'https://app.streamflow.finance/static/media/sol-logo.0f289c9c.png',
};

export const WSOL_Token: PaymentToken = {
  pubkey: '2RmhFKwKT5cjrQHbgLfGFyjZ8g6JjF1D69Sks7MVvyRC',
  address: 'So11111111111111111111111111111111111111112',
  name: 'Wrapped SOL',
  symbol: 'wSOL',
  decimals: 9,
  balance: 0,
  uri: 'https://app.streamflow.finance/static/media/sol-logo.0f289c9c.png',
};
