import { db, Batches, Users } from 'db';
import { DeepMutable, mockBatches, mockUsers } from 'utils';

import { router, publicProcedure } from '..';

export const utilRouter = router({
  seedDb: publicProcedure.mutation(() => {
    db.users = structuredClone(mockUsers) as unknown as DeepMutable<Users>;
    db.batches = structuredClone(mockBatches) as unknown as DeepMutable<Batches>;

    return 'Database initialized successfully.' as const;
  }),
});
