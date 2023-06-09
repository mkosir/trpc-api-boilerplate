import { DeepMutable, mockBatches, mockUsers } from 'utils';

import { Batches } from './Batch';
import { Users } from './User';

export const db = {
  users: structuredClone(mockUsers) as unknown as DeepMutable<Users>,
  batches: structuredClone(mockBatches) as unknown as DeepMutable<Batches>,
};
