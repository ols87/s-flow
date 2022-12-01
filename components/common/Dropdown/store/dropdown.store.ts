import { atom } from 'recoil';
import { DropdownProps, DropdownModel, DropdownState, DropdownValue } from '../types';

const items = [''];

const dropdownModel: DropdownModel = {
  items,
  isOpen: false,
  selected: items[0],
};

// Allow any keys
const dropdownStore: any = {};

export function dropDownState(props: DropdownProps): DropdownValue | DropdownState {
  const { id, items } = props;

  if (!dropdownStore[id]) {
    dropdownStore[id] = atom({
      key: `dropdown-${id}`,
      default: {
        ...dropdownModel,
        items,
        selected: items[0],
      },
    });
  }

  return dropdownStore[id];
}
