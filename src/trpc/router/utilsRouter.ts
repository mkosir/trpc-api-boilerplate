import { db } from 'index';
import { Batches, DeepMutable, Users, mockBatches, mockUsers } from 'utils';

import { router, publicProcedure } from '..';

export const utilsRouter = router({
  seedDb: publicProcedure.query(() => {
    db.users = structuredClone(mockUsers) as unknown as DeepMutable<Users>;
    db.batches = structuredClone(mockBatches) as unknown as DeepMutable<Batches>;
  }),
});
