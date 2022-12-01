import * as ToastPrimitive from '@radix-ui/react-toast';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { styles } from './css';
import { toastStore, updateToastStore } from './store';
import { ToastProps } from './types';

export function ToastComponent({ id, title, text, status }: ToastProps) {
  const state = useRecoilValue(toastStore(id));
  const update = useSetRecoilState(toastStore(id));

  function toggle() {
    let isOpen = !state.isOpen || false;
    update(updateToastStore({ isOpen }));
  }

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        open={state.isOpen}
        className={`${styles.wrapper} ${styles[status]}`}
        data-test={`toast-wrapper-${id}`}
      >
        <div>
          <ToastPrimitive.Title className={styles.title}>{title}</ToastPrimitive.Title>
          <ToastPrimitive.Description className={styles.description}>{text}</ToastPrimitive.Description>
        </div>

        <div>
          <ToastPrimitive.Close data-test={`toast-dismiss-${id}`} className={styles.close} onClick={toggle}>
            Dismiss
          </ToastPrimitive.Close>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}
