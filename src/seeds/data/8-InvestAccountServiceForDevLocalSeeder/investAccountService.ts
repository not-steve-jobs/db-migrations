import { DeepPartial } from 'typeorm';

import { InvestAccounts } from '../../../entity/cfd/InvestAccounts';
import { Profiles } from '../../../entity/client/Profiles';

export const investAccount: DeepPartial<InvestAccounts> = {
  id: 'fbe77410-db94-4596-9731-9ee5d81e9625',
  accountId: '48b8da08-66ac-4a71-aac7-0caaf63ada4b',
  reference: 'INV-123151328312-CYP',
  group: 'real\BBGMBGE',
  login: '5293771',
  platform: 'mt5',
  platformName: 'MT5',
  server: 'm5.test',
  currency: 'EUR',
  status: 'active',
  subStatus: '',
  serverType: 'mt5',
  customName: 'customName',
};

export const profile: DeepPartial<Profiles> = {
  email: 'admin@example2.com',
  id: 'df312249-f274-49c2-8ee7-6ae3caf40613',
  authority: 'cysec',
  country: 'CY',
  passwordHash: '$2a$10$lGr.gM2YFW5HWuinlJowtOch6Jl72AhuoKF3EAlojoY/952YTaRMO',
  role: 'admin',
  status: 'verified',
};
