import { DeepPartial } from 'typeorm';

import { Profiles } from '../../../entity/client/Profiles';
import { LegalChecks } from '../../../entity/legalChecks/LegalChecks';
import { LegalCheckFields } from '../../../entity/legalChecks/LegalCheckFields';
import { Clients } from '../../../entity/client/Clients';

export const profile1: DeepPartial<Profiles> = {
  email      : 'test3@example.com',
  id           : '34a10690-7aa8-463a-9aca-c7303513ec97',
  authority    : 'fca',
  country      : 'CY',
  passwordHash : '$2a$10$j8n9mtIUoS3iWCFHF5OCh.CmDD3TUmW6.Hl0ESSEwl5GNxT1hr/6m',
  role         : 'user',
  status       : 'verified',
};

export const legalCheck1: DeepPartial<LegalChecks> = {
  accountId : 'd4cd9ed2-1f7c-4f1a-be8b-ef1f487bead0',
  poiState : 'submitted',
  porState : 'submitted',
};

export const profile2: DeepPartial<Profiles> = {
  email      : 'test2@example.com',
  id           : '7ba32610-7cfb-44ac-b186-6877441fef78',
  authority    : 'fca',
  country      : 'CY',
  passwordHash : '$2a$10$j8n9mtIUoS3iWCFHF5OCh.CmDD3TUmW6.Hl0ESSEwl5GNxT1hr/6m',
  role         : 'user',
  status       : 'verified',
};

export const legalCheck2: DeepPartial<LegalChecks> = {
  accountId : '7ba32610-7cfb-44ac-b186-6877441fef78',
  poiState : null,
  porState : null,
};

export const legalCheckField: DeepPartial<LegalCheckFields> = {
  legalCheckId : 1,
  key : 'applicantId',
  value : '"77309603-bc4c-4715-b4f7-2de0c211242a"',
};

export const client: DeepPartial<Clients> = {
  email      : 'test@example.com',
  id           : '9a6d9fc9-d3e7-42b4-b706-0581b8f67a88',
  passwordHash : '$2a$10$j8n9mtIUoS3iWCFHF5OCh.CmDD3TUmW6.Hl0ESSEwl5GNxT1hr/6m',
  cif          : '2218af784e5044e39907841498c04e88',
  type         : 'retail',
};
