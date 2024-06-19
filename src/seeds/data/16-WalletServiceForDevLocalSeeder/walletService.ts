import { DeepPartial } from 'typeorm';

import { Profiles } from '../../../entity/client/Profiles';

export const profile: DeepPartial<Profiles> = {
  id: '79c7b694-4fe2-4c9b-903b-5da3cc9d3161',
  clientId: 'b4e08719-6cba-4bd6-8786-ecdc43670379',
  role: 'user',
  status: 'completed',
  authority: 'mena',
  country: 'CY',
  email: 'wallet-service-vance@gmail.com',
};
