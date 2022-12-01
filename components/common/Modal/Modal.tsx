import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import React, { Fragment } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalStore, updateModalStore } from './store';
import { ModalProps } from './types';
import { styles } from './css';

export function ModalComponent({ id, trigger, title, body }: ModalProps) {
  const state = useRecoilValue(modalStore(id));
  const update = useSetRecoilState(modalStore(id));

  function toggle() {
    let isOpen = !state.isOpen || false;
    update(updateModalStore({ isOpen }));
  }

  return (
    <>
      <div role="button" onClick={toggle}>
        {trigger}
      </div>

      <Transition appear show={state.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggle} data-test={`modal-container-${id}`}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.backdrop} data-test={`modal-backdrop-${id}`} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className={styles.panelWrapper} data-test={`modal-wrapper-${id}`}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={styles.panel} data-test={`modal-panel-${id}`}>
                  <Dialog.Title as="h2" className={styles.title} data-test={`modal-title-${id}`}>
                    {title}

                    <button className={styles.close} onClick={toggle} data-test={`modal-close-${id}`}>
                      <Icon data-test={`modal-icon-${id}`} icon={`ph:x-bold`} />
                    </button>
                  </Dialog.Title>
                  <div data-test={`modal-body-${id}`}>{body}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
