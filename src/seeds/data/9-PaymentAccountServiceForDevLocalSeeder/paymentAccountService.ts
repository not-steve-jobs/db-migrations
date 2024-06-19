import { DeepPartial } from 'typeorm';

import { PaymentAccounts } from '../../../entity/payment/PaymentAccounts';
import { PaymentAccountFields } from '../../../entity/payment/PaymentAccountFields';
import { Profiles } from '../../../entity/client/Profiles';

export const profile: DeepPartial<Profiles> = {
  id: '4b590d15-ff83-49d5-90e3-989b0c024f14',
  clientId: '5b3c3563-c76d-4b19-b79e-4114dbe54050',
  role: 'user',
  status: 'completed',
  authority: 'mena',
  country: 'CY',
  email: 'waynevance@gmail.com',
};

export const paymentAccount1: DeepPartial<PaymentAccounts> = {
  id: 'c8d8f27b-4960-440c-84b0-db97f23c138e',
  profileId: '4b590d15-ff83-49d5-90e3-989b0c024f14',
  reference: 'reference',
  hash: '29e3cff9d008d1628cdfdcdb60074c69',
  holderName: undefined,
  paymentProviderAccountId: undefined,
  paymentProvider: 'bankwire',
  processorName: 'mastercard',
  status: 'active',
  currency: 'EUR',
  authority: 'mena',
};

export const paymentAccount1Fields: DeepPartial<PaymentAccountFields>[] = [
  {
    id: '7e021752-ee93-42bd-9bbf-17258f900cfc',
    paymentAccountId: 'c8d8f27b-4960-440c-84b0-db97f23c138e',
    key: 'bankAddress',
    value: 'bankAddress',
  },
  {
    id: 'cd94ea47-de98-44e8-a8cf-2d156d2deec2',
    paymentAccountId: 'c8d8f27b-4960-440c-84b0-db97f23c138e',
    key: 'bankName',
    value: 'bankName',
  },
];

export const paymentAccount2: DeepPartial<PaymentAccounts> = {
  id: '3f839d41-6f1c-45b4-a9b2-9fb04b01dc93',
  profileId: '4b590d15-ff83-49d5-90e3-989b0c024f14',
  reference: 'accountNumberOrIbanbankwirePaymentAccountDetails',
  hash: '2c75bc7b22b71dbadf9e64b126d73946',
  holderName: 'accountNamebankwirePaymentAccountDetails',
  paymentProviderAccountId: undefined,
  paymentProvider: 'bankwire',
  processorName: 'mastercard',
  status: 'active',
  currency: 'EUR',
  authority: 'mena',
};

export const paymentAccount2Fields: DeepPartial<PaymentAccountFields>[] = [
  {
    id: 'a3a53f39-bcd5-4758-bbd6-817f0d37626c',
    paymentAccountId: '3f839d41-6f1c-45b4-a9b2-9fb04b01dc93',
    key: 'bankAddress',
    value: 'bankAddress',
  },
  {
    id: 'fbf5a8a7-059c-4c72-93e9-0204fbf4d55f',
    paymentAccountId: '3f839d41-6f1c-45b4-a9b2-9fb04b01dc93',
    key: 'bankName',
    value: 'bankName',
  },
  {
    id: 'e89553f8-61e4-4b9e-a4bb-71f4978aae2f',
    paymentAccountId: '3f839d41-6f1c-45b4-a9b2-9fb04b01dc93',
    key: 'swiftOrBic',
    value: 'swiftOrBicbankwirePaymentAccountDetails',
  },
  {
    id: '74db0397-148b-4128-b9cb-e22da51db778',
    paymentAccountId: '3f839d41-6f1c-45b4-a9b2-9fb04b01dc93',
    key: 'accountName',
    value: 'accountName',
  },
  {
    id: 'b5347fff-adbe-4164-b2da-25d19d7b8c12',
    paymentAccountId: '3f839d41-6f1c-45b4-a9b2-9fb04b01dc93',
    key: 'accountNumberOrIban',
    value: 'accountNumberOrIbanbankwirePaymentAccountDetails',
  },
];

export const paymentAccount3: DeepPartial<PaymentAccounts> = {
  id: 'fa566976-0a37-400f-83bd-7736ff78bdb5',
  profileId: '4b590d15-ff83-49d5-90e3-989b0c024f14',
  reference: 'reference',
  hash: '29e3cff9d008d1628cdfdcdb60074c45',
  holderName: undefined,
  paymentProviderAccountId: undefined,
  paymentProvider: 'stripe',
  processorName: 'mastercard',
  status: 'active',
  currency: 'EUR',
  authority: 'mena',
};

export const paymentAccount4: DeepPartial<PaymentAccounts> = {
  id: '8bcf45e3-447c-4d4b-9931-300a62dbe43b',
  profileId: '4b590d15-ff83-49d5-90e3-989b0c024f14',
  reference: '5178925363360396',
  hash: '86bda588ec1dd708b27e060f4bf87581',
  holderName: undefined,
  paymentProviderAccountId: undefined,
  paymentProvider: 'expay',
  processorName: undefined,
  status: 'declined',
  currency: 'EUR',
  authority: 'mena',
};
