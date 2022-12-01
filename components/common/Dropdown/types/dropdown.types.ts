import { RecoilState, RecoilValue } from 'recoil';

export interface DropdownProps {
  items: any[];
  id: string;
}
export interface DropdownModel {
  isOpen: boolean;
  items: any[];
  selected: any;
}

export type DropdownValue = RecoilValue<DropdownModel>;
export type DropdownState = RecoilState<DropdownModel>;
