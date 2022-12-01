export interface ModalProps {
  id: string;
  title: string;
  trigger: any;
  body: any;
}

export interface ModalState {
  isOpen: boolean;
}

export type ModalStoreUpdate = (state: ModalState) => ModalState;
