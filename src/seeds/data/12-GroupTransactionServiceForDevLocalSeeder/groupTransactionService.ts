import { DeepPartial } from 'typeorm';

import { GroupTransactions } from '../../../entity/payment/GroupTransactions';
import { Transactions } from '../../../entity/payment/Transactions';

export const groupTransaction: DeepPartial<GroupTransactions> = {
  id: '5dc76ad5-6311-4fce-9cc7-09fa7c0dfc77',
  reference: 'GT-3000000000808442',
  profileId: '48b8da08-66ac-4a71-aac7-0caaf63ada4b',
  status: 'cancelled',
  type: 'deposit',
  stp: false,
  stpDescription: undefined,
  stpStatus: undefined,
  noCommission: false,
  processingDescription: undefined,
  riskFactor: undefined,
  paymentType: undefined,
  paymentIntegrator: 'skrill',
  linkedTo: undefined,
  linkedType: undefined,
  created: '2020-01-14 14:32:11.320',
  updated: '2020-01-15 14:35:54.712',
};

export const transaction: DeepPartial<Transactions> = {
  id: '0000544f-ea3b-456a-b030-af5d0253426c',
  groupTransactionId: '5dc76ad5-6311-4fce-9cc7-09fa7c0dfc77',
  order: 2,
  reference: 'T-3000000001442912',
  accountType: 'wallet',
  accountId: 'c8541df9-70c3-4b0b-a093-3b31167fe61c',
  accountTransactionId: undefined,
  profileId: '48b8da08-66ac-4a71-aac7-0caaf63ada4b',
  status: 'created',
  type: 'deposit',
  refundableAmount: undefined,
  currency: 'EUR',
  amount: undefined,
  feeAmount: '0.0000',
  commissionAmount: '0.0000',
  incomingCurrency: undefined,
  incomingAmount: undefined,
  currencyRate: undefined,
  currencyRateSource: undefined,
  refundedTransactionId: undefined,
  checkoutId: undefined,
  suspicious: false,
  description: undefined,
  dateProcessed: undefined,
  created: '2020-02-20 14:43:20.522',
  updated: '2020-02-20 14:43:20.522',
};
