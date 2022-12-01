export interface ToastProps {
  id: string;
  title: string;
  text: any;
  status: 'notify' | 'success' | 'error';
}

export interface ToastState {
  isOpen: boolean;
}

export type ToastStoreUpdate = (state: ToastState) => ToastState;
