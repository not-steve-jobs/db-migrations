import { DeepPartial } from 'typeorm';

import { Profiles } from '../../../entity/client/Profiles';
import { ProfileFields } from '../../../entity/client/ProfileFields';
import { Accounts } from '../../../entity/cfd/Accounts';
import { Documents } from '../../../entity/legalChecks/Documents';
import { GlobalRestrictions } from '../../../entity/cfd/GlobalRestrictions';

export const adminProfile: DeepPartial<Profiles> = {
  // Admin user
  // The password is: admin
  email: 'admin@example.com',
  id: '48b8da08-66ac-4a71-aac7-0caaf63ada4b',
  clientId: '',
  authority: 'cysec',
  country: 'CY',
  passwordHash: '$2a$10$lGr.gM2YFW5HWuinlJowtOch6Jl72AhuoKF3EAlojoY/952YTaRMO',
  role: 'admin',
  status: 'verified',
  cif: '300034536823',
};

export const adminProfileFields : DeepPartial<ProfileFields> =
  {
    profileId: '48b8da08-66ac-4a71-aac7-0caaf63ada4b',
    key: 'phone',
    value: '+7-911-999-99-99',
  };

export const adminAccount: DeepPartial<Accounts> = {
  profileId: '48b8da08-66ac-4a71-aac7-0caaf63ada4b',
  id: '56524717-0417-459e-8c57-12253d93bf5e',
  partnership: '',
  login: '999999999',
  server: 'xt.test',
  status: 'active',
  substatus: '',
  platform: 'fxpro',
  group: 'demoDGHQBGD',
  serverType: 'mt4',
  supportsLeverage: true,
};

export const testUserProfile: DeepPartial<Profiles> = {
  // Test user
  // The password is: tester
  email: 'test@example.com',
  id: 'd4cd9ed2-1f7c-4f1a-be8b-ef1f487bead0',
  clientId: '',
  authority: 'fca',
  country: 'CY',
  passwordHash: '$2a$10$j8n9mtIUoS3iWCFHF5OCh.CmDD3TUmW6.Hl0ESSEwl5GNxT1hr/6m',
  role: 'user',
  status: 'verified',
  cif: '30052556823',
};

export const testUserProfileFields : DeepPartial<ProfileFields> = {
  profileId: 'd4cd9ed2-1f7c-4f1a-be8b-ef1f487bead0',
  key: 'phone',
  value: '+7-911-000-00-00',
};

export const testUserD1Profile : DeepPartial<Profiles> = {
  // Test user (migrated from D1)
  // The password is: i_am_md5_hashed_password
  email: 'test_migrated@example.com',
  id: 'fd5bfaa9-c5dc-4a1d-bee7-6d9f37acb3a7',
  clientId: '',
  authority: 'gm',
  country: 'DE',
  passwordHash: '8bdafdf6a21049ca572552c33b45f199',
  role: 'user',
  status: 'verified',
  cif: '5234534536823',
};

export const testUserD1ProfileFields: DeepPartial<ProfileFields> = {
  profileId: 'fd5bfaa9-c5dc-4a1d-bee7-6d9f37acb3a7',
  key: 'phone',
  value: '+7-922-123-44-55',
};

export const testAccount : DeepPartial<Accounts> = {
  profileId: 'd4cd9ed2-1f7c-4f1a-be8b-ef1f487bead0',
  id: 'dd2f6161-1371-4cb4-b3c0-61960dc5669d',
  partnership: '',
  login: '88888888',
  server: 'xt.test',
  platform: 'fxpro',
  status: 'active',
  substatus: '',
  group: 'demoDGHQBGD',
  serverType: 'mt4',
  supportsLeverage: true,
};

export const documents : DeepPartial<Documents>[] = [
  {
    id: '20a5cd24-9c8b-408b-896c-05df676213b4',
    objectId: 'ee9cdab2-ff9b-4f16-b5f0-144ed5c2e5ec',
    name: 'katz.mov',
    ownerType: 'profile',
    ownerId: '48b8da08-66ac-4a71-aac7-0caaf63ada4b',
    docType: 'POR',
    mimeType: 'video/mov',
    expirationDate: '2019-10-11',
    side: 'front',
    status: 'pending',
    translation: 'Meow meow meow',
  },
  {
    id: '702b55d7-e86d-4c24-a861-dad4c5ecaa59',
    objectId: 'bf9ac843-21a3-4e4a-b259-b68681e2d90b',
    name: 'dags.mov',
    ownerType: 'profile',
    ownerId: 'd4cd9ed2-1f7c-4f1a-be8b-ef1f487bead0',
    docType: 'POR',
    mimeType: 'video/mov',
    expirationDate: '2018-10-11',
    side: 'front',
    status: 'pending',
    translation: 'Bark bark bark',
  },
];

export const globalRestrictions : DeepPartial<GlobalRestrictions>[] = [
  {
    id: 'e783881b-4cbc-4269-8628-33cdd6c2d091',
    authority: 'gm',
    restrictions:
      '{"maxLeverage":"500","maxTradingAccounts":"5","limitWithdrawOptions":"true","canChangeLeverage":"false","maxWallets":"1"}',
  },
  {
    id: 'fb7e8c42-4e4a-48a7-a601-dad4af91c024',
    authority: 'mena',
    restrictions:
      '{"maxLeverage":"50","maxWallets":"1","canChangeLeverage":"false","limitWithdrawOptions":"true","maxTradingAccounts":"5"}',
  },
];

export const globalRestrictionsForCountry : DeepPartial<GlobalRestrictions>[] = [
  {
    id: 'ebfcfccf-ae25-4a86-8970-5b0671c622fd',
    authority: 'gm',
    country: 'TH',
    restrictions: '{"maxLeverage":"100","maxTradingAccounts":"10"}',
  },
  {
    id: 'db223d23-6979-4c9e-b997-198fd7260d47',
    authority: 'mena',
    country: 'AE',
    restrictions: '{"canChangeLeverage":"true","limitWithdrawOptions":"false"}',
  },
];

export const globalRestrictionsForRiskAppetite : DeepPartial<GlobalRestrictions>[] = [
  {
    id: '4b590d15-ff83-49d5-90e3-989b0c024f14',
    authority: 'cysec',
    riskAppetite: 'high',
    restrictions: '{"maxLeverage":"20","canChangeLeverage":"false"}',
  },
];
