import React, { Fragment } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';

import { dropDownState } from './store';
import { DropdownProps, DropdownModel, DropdownState, DropdownValue } from './types';
import { styles } from './css';

export function DropdownComponent(props: DropdownProps) {
  const { id } = props;

  const componentState = dropDownState(props);
  const state = useRecoilValue(componentState as DropdownValue);
  const update = useSetRecoilState(componentState as DropdownState);

  function select(selected: any) {
    update((state: DropdownModel) => {
      return { ...state, selected };
    });
  }

  return (
    <Menu as="div" className={styles.menu} data-test={`dropdown-wrapper-${id}`}>
      <Menu.Button className={styles.button} data-test={`dropdown-button-${id}`}>
        {state.selected}
        <Icon className="ml-1" icon="ph:caret-down-bold" data-test={`dropdown-icon-${id}`} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter={styles.enter}
        enterFrom={styles.enterFrom}
        enterTo={styles.enterTo}
        leave={styles.leave}
        leaveFrom={styles.leaveFrom}
        leaveTo={styles.leaveTo}
      >
        <Menu.Items className={styles.items}>
          {(state.items || []).map((item: string, index: number) => {
            return (
              <Menu.Item
                key={index}
                as="div"
                className={styles.item}
                onClick={() => select(item)}
                data-test={`dropdown-item-${id}`}
              >
                {item}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
