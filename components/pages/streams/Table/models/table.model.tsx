import { ColumnHelper, createColumnHelper } from '@tanstack/react-table';
import { StreamColumns } from '../types';

const columnHelper: ColumnHelper<StreamColumns> = createColumnHelper<StreamColumns>();

export const columns: any[] = [
  columnHelper.accessor('expander', {
    header: () => null,
  }),
  columnHelper.accessor('status', {
    header: () => <h6>Status</h6>,
  }),
  columnHelper.accessor('type', {
    header: () => <h6>Type/Direction</h6>,
  }),
  columnHelper.accessor('subject', {
    header: () => <h6>Subject/Stream ID</h6>,
  }),
  columnHelper.accessor('withdraw', {
    header: () => <h6>Withdraw</h6>,
  }),
  columnHelper.accessor('unlocked', {
    header: () => <h6>Unlocked(Returned)</h6>,
  }),
  columnHelper.accessor('release_rate', {
    header: () => <h6>Release Rate</h6>,
  }),
];
