import { atomFamily } from 'recoil';
import { ToastState, ToastStoreUpdate } from '../types';

const toastState = {
  isOpen: false,
};

export const toastStore = atomFamily({
  key: `ToastComponent`,
  default: toastState,
});

export function updateToastStore(newState: Partial<ToastState>): ToastStoreUpdate {
  return (state: ToastState) => {
    return { ...state, ...newState };
  };
}
