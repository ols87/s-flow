import { BN } from '@streamflow/stream';
import { Row } from '@tanstack/react-table';

export interface StreamColumns {
  expander: boolean;
  status: string;
  type: string;
  direction: string;
  subject: string;
  withdraw: string;
  unlocked: string;
  release_rate: string;
  actions: string;
}

export interface StreamContract {
  name: string;
  canTopup: boolean;
  sender: string;
  recipient: string;
  withdrawnAmount: BN;
  depositedAmount: BN;
  cliffAmount: BN;
  amountPerPeriod: BN;
  start: number;
  end: number;
  period: number;
}

export interface StreamsData {
  id: string;
  contract: StreamContract;
}

export interface TableProps<TData> {
  data: TData[];
  getRowCanExpand: (row: Row<TData>) => boolean;
}
