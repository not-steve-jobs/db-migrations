import { DeepPartial } from 'typeorm';

import { Payments } from '../../../entity/payment/Payments';

export const payment1: DeepPartial<Payments> = {
  id: '07b8517f-0315-4173-a0da-7516b9c99020',
  state: 'initiate',
  status: 'success',
  provider: 'stripe',
  authPaymentId: '1ab0bad3-7849-4f12-a093-e3fe05ed27d7',
  originalPaymentId: '1ab0bad3-7849-4f12-a093-e3fe05ed27d7',
  groupTransactionOrderId: '',
  amount: 0,
  currency: 'EUR',
  fee: 0,
  merchantReference: '',
};

export const payment2: DeepPartial<Payments> = {
  id: 'e838808c-a387-4b27-8974-3773661ead4e',
  state: 'authorise',
  status: 'success',
  provider: 'stripe',
  authPaymentId: '9750ed51-ef76-41ec-b7e3-49ad9bccb333',
  originalPaymentId: '9750ed51-ef76-41ec-b7e3-49ad9bccb333',
  groupTransactionOrderId: '',
  amount: 0,
  currency: 'EUR',
  fee: 0,
  merchantReference: '',
};
