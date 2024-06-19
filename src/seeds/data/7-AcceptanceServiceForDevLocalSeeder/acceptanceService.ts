import { DeepPartial } from 'typeorm';

import { Profiles } from '../../../entity/client/Profiles';
import { ProfileFields } from '../../../entity/client/ProfileFields';

export const profileWithStatusAndScore: DeepPartial<Profiles> = {
  email: 'winner3@example.com',
  id: 'b5943b8b-955d-45e9-b431-77ba81e24363',
  authority: 'cysec',
  country: 'CY',
  passwordHash: '$2a$10$lGr.gM2YFW5HWuinlJowtOch6Jl72AhuoKF3EAlojoY/952YTaRMO',
  role: 'admin',
  status: 'verified',
};

export const profileFieldsWithStatusAndScore: DeepPartial<ProfileFields>[] = [
  {
    profileId: 'b5943b8b-955d-45e9-b431-77ba81e24363',
    key: 'appropriatenessScore',
    value: '10',
  },
  {
    profileId: 'b5943b8b-955d-45e9-b431-77ba81e24363',
    key: 'appropriatenessStatus',
    value: 'passed',
  },
];

export const profileWithFailedStatusAndPassedScore: DeepPartial<Profiles> = {
  email: 'winner4@example.com',
  id: 'b5943b8b-955d-45e9-b431-77ba81e24364',
  authority: 'cysec',
  country: 'CY',
  passwordHash: '$2a$10$lGr.gM2YFW5HWuinlJowtOch6Jl72AhuoKF3EAlojoY/952YTaRMO',
  role: 'admin',
  status: 'verified',
};

export const profileFieldsWithFailedStatusAndPassedScore: DeepPartial<ProfileFields>[] = [
  {
    profileId: 'b5943b8b-955d-45e9-b431-77ba81e24364',
    key: 'appropriatenessScore',
    value: '10',
  },
  {
    profileId: 'b5943b8b-955d-45e9-b431-77ba81e24364',
    key: 'appropriatenessStatus',
    value: 'failed',
  },
];

export const profileWithStatus: DeepPartial<Profiles> = {
  email: 'winner@example.com',
  id: 'b5943b8b-955d-45e9-b431-77ba81e24362',
  authority: 'cysec',
  country: 'CY',
  passwordHash: '$2a$10$lGr.gM2YFW5HWuinlJowtOch6Jl72AhuoKF3EAlojoY/952YTaRMO',
  role: 'admin',
  status: 'verified',
};

export const profileFieldsWithStatus: DeepPartial<ProfileFields>[] = [
  {
    profileId: 'b5943b8b-955d-45e9-b431-77ba81e24362',
    key: 'appropriatenessStatus',
    value: 'passed',
  },
];
