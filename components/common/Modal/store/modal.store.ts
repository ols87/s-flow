import { atomFamily } from 'recoil';
import { ModalState, ModalStoreUpdate } from '../types';

const modalState = {
  isOpen: false,
};

export const modalStore = atomFamily({
  key: `ModalComponent`,
  default: modalState,
});

export function updateModalStore(newState: Partial<ModalState>): ModalStoreUpdate {
  return (state: ModalState) => {
    return { ...state, ...newState };
  };
}
