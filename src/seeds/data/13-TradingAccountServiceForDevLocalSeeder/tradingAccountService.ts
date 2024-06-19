import { DeepPartial } from 'typeorm';

import { Profiles } from '../../../entity/client/Profiles';
import { Accounts } from '../../../entity/cfd/Accounts';
import { Wallets } from '../../../entity/cfd/Wallets';

export const profile1: DeepPartial<Profiles> = {
  id: '1e47e490-6e0d-4300-b34a-7cd0e578f4ff',
  clientId: 'dfc312fa-e55f-43f6-ae9a-b599baae436b',
  role: 'user',
  email: 'johnvance@gmail.com',
  status: 'completed',
  authority: 'fca',
  country: 'CY',
};

export const profile2: DeepPartial<Profiles> = {
  id: 'b3819870-1d11-45c7-bd21-53ea82920410',
  clientId: '1dbbb1a8-7cfe-46c3-8178-f349a29811b3',
  role: 'user',
  email: 'jezzvance@gmail.com',
  status: 'completed',
  authority: 'fca',
  country: 'CY',
};

export const account: DeepPartial<Accounts> = {
  id: 'e600156e-6682-428b-92d7-f8e3a1f1345d',
  profileId: '4b590d15-ff83-49d5-90e3-989b0c024f14',
  login: '9999333',
  server: 'xt.test',
  type: 'real',
  status: 'active',
  group: 'demoDGHQBGD',
  serverType: 'mt4',
  supportsLeverage: true,
  platform: 'fxpro',
};

export const wallet: DeepPartial<Wallets> = {
  id: '9b13b58a-09d1-4f1d-9bca-495e54285afb',
  profileId: '4b590d15-ff83-49d5-90e3-989b0c024f14',
  reference: 'reference',
  currency: 'EUR',
  group: 'demoDGHQBGD',
  status: 'active',
  substatus: '',
  accountLogin: '9999333',
  server: 'xt.test',
  partnership: '',
};
