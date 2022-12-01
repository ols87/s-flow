import { atom } from 'recoil';
import { PaymentFormModel } from '../models/form.model';
import { PaymentFormState, PaymentFormStoreUpdate } from '../types';

export const paymentFormStore = atom({
  key: `PaymentFormComponent`,
  default: PaymentFormModel,
});

export function updatePaymentFormStore(newState: Partial<PaymentFormState>): PaymentFormStoreUpdate {
  return (state: PaymentFormState) => {
    return { ...state, ...newState };
  };
}
