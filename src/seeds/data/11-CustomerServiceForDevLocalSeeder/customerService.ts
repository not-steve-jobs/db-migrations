import { DeepPartial } from 'typeorm';

import { Clients } from '../../../entity/client/Clients';
import { Profiles } from '../../../entity/client/Profiles';
import { AccountPeriodicUpdates } from '../../../entity/legalChecks/AccountPeriodicUpdates';
import { AccountPeriodicUpdateFields } from '../../../entity/legalChecks/AccountPeriodicUpdateFields';

export const client: DeepPartial<Clients> = {
  id: '547a957d-8803-4838-9e3f-c17f42b65b86',
  email: 'test@tesddddter.com',
  passwordHash: 'passwowdedwdrdHash',
  cif: '000151122393871',
  type: 'retail',
};

export const profile: DeepPartial<Profiles> = {
  id: '9aecbc97-3f00-481b-bad6-27416e5b55ce',
  clientId: '6f2d8f11-ca3d-4a91-a751-6f1091b75e76',
  email: 'aTestUser@a.com',
  authority: 'fca',
  country: 'CY',
  status: 'verified',
  role: 'user',
};

export const accountPeriodicUpdates: DeepPartial<AccountPeriodicUpdates> = {
  id: '06512744-78d6-4593-b318-4af9e2cf491f',
  accountId: '9aecbc97-3f00-481b-bad6-27416e5b55ce',
  status: 'pending',
  personalDataSubmitted: false,
  taxIdSubmitted: false,
  proofOfResidenceSubmitted: false,
  created: new Date(),
  updated: new Date(),
  startDate: new Date(),
  endDate: new Date(),
};

export const accountPeriodicUpdateFields: DeepPartial<AccountPeriodicUpdateFields> = {
  id: '9553b818-7b33-458c-a913-4556d51b0e88',
  accountId: '9aecbc97-3f00-481b-bad6-27416e5b55ce',
  accountPeriodicUpdateId: '06512744-78d6-4593-b318-4af9e2cf491f',
  key: 'firstName',
  value: 'John',
  created: new Date(),
  updated: new Date(),
};
