import { SOL_Token } from '../../Tokens';
import { PaymentFormState } from '../types';

export const PaymentFormModel: PaymentFormState = {
  selected: SOL_Token,
  tokens: [],
  releaseFrequencyPeriod: 1,
  releaseFrequencyCounter: 1,
  releaseAmount: '1',
  whoCanTransfer: 'recipient',
  whoCanCancel: 'sender',
  startDate: new Date().toLocaleDateString(),
  startTime: new Date(new Date().getTime() + 3 * 60000).toTimeString().slice(0, 5),
};

export const DEFAULT_URI = 'https://static-content-23313.s3.amazonaws.com/logo.c4294b7c.png';
