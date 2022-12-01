import { PaymentToken } from '../../Tokens/';

export interface PaymentFormState {
  selected?: PaymentToken;
  tokens: PaymentToken[];
  releaseAmount?: string;
  releaseFrequencyCounter: number;
  releaseFrequencyPeriod: number;
  whoCanTransfer: string;
  whoCanCancel: string;
  startDate: string;
  startTime: string;
}

export type PaymentFormStoreUpdate = (state: PaymentFormState) => PaymentFormState;
