import { StreamContract } from '../types';
import { BN, getBN } from '@streamflow/stream';

export const shortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
};

export const convertAmount = (amount: BN) => {
  return (amount.toNumber() / getBN(1, 9).toNumber()).toFixed(2);
};

export const unlock = (row: any) => {
  const date = Math.ceil(Date.now() / 1000);
  const amountPerPeriod = row.amountPerPeriod.toNumber();
  const cliffAmount = row.cliffAmount.toNumber();

  if (date > row.end) {
    return (row.depositedAmount.toNumber() / getBN(1, 9).toNumber()).toFixed(2);
  }

  return (
    ((Math.ceil((date - row.cliff) / row.period) - 1) * amountPerPeriod + cliffAmount) /
    getBN(1, 9).toNumber()
  ).toFixed(2);
};

export const convertDate = (time: number) => {
  const date = new Date(time * 1000).toDateString();
  return date;
};

export const convertPeriod = (period: number) => {
  switch (period) {
    case 1:
      return 'Per Second';
    case 60:
      return 'Per Minute';
    case 3600:
      return 'Per Hour';
    case 86400:
      return 'Per Day';
    case 604800:
      return 'Per Week';
  }
};

export const convertStatus = (time: StreamContract) => {
  const date = Math.ceil(Date.now() / 1000);
  if (date < time.start) {
    return 'Schedule';
  }
  if (date > time.start && date < time.end) {
    return 'Streaming';
  }
  if (date > time.end) {
    return 'Completed';
  }
};
