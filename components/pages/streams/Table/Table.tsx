import React, { Fragment } from 'react';
import { Icon } from '@iconify/react';

import { flexRender, getCoreRowModel, useReactTable, getExpandedRowModel, Row } from '@tanstack/react-table';

import { columns } from './models';
import { convertAmount, convertDate, convertPeriod, convertStatus, shortAddress, unlock } from './utils';
import { StreamsData, TableProps } from './types';

export function StreamsTableComponent({ data, getRowCanExpand }: TableProps<StreamsData>) {
  const table = useReactTable<StreamsData>({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="p-4">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-16 text-left align-top ">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row: Row<StreamsData>) => {
            const contract = row.original.contract;

            return (
              <Fragment key={row.id}>
                <tr key={row.id} className="h-20 align-top table-fixed">
                  <td key="expander">
                    {row.getCanExpand() ? (
                      <button
                        {...{
                          onClick: row.getToggleExpandedHandler(),
                          style: { cursor: 'pointer' },
                        }}
                      >
                        {row.getIsExpanded() ? (
                          <Icon fontSize={16} icon={'ph:caret-down-bold'} />
                        ) : (
                          <Icon fontSize={16} icon={'ph:caret-right-bold'} />
                        )}
                      </button>
                    ) : undefined}
                  </td>

                  <td key="status">{convertStatus(contract)}</td>

                  <td key="type">
                    {contract.canTopup ? 'Stream' : 'Vesting'} <br />
                    <small>Incoming</small>
                  </td>

                  <td key="id">
                    {contract.name.startsWith('\u0000') ? 'N/A' : contract.name.replace(/[^\w\s]/gi, '')} <br />
                    <small>Stream ID: {shortAddress(row.original.id)}</small>
                    {row.getIsExpanded() && (
                      <div className="my-4">
                        <small>From: {shortAddress(contract.sender)}</small>

                        <br />

                        <small>To: {shortAddress(contract.recipient)}</small>
                      </div>
                    )}
                  </td>

                  <td key="withdraw">
                    {convertAmount(contract.withdrawnAmount)}/{convertAmount(contract.depositedAmount)}
                    {row.getIsExpanded() && (
                      <div className="my-4">
                        <small>Start Date</small>

                        <br />

                        <small>{convertDate(contract.start)}</small>
                      </div>
                    )}
                  </td>

                  <td key="unlocked">
                    {unlock(contract)} / {convertAmount(contract.depositedAmount)}
                    {row.getIsExpanded() && (
                      <div className="my-4">
                        <small>End Date</small>

                        <br />

                        <small>{convertDate(contract.end)}</small>
                      </div>
                    )}
                  </td>
                  <td key="release_rate">
                    {convertAmount(contract.amountPerPeriod)} <br />
                    <small>{convertPeriod(contract.period)}</small>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
