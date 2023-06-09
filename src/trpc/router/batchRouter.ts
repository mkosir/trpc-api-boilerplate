import { db } from 'db';
import { sleep } from 'utils';

import { router, publicProcedure } from '..';

export const batchRouter = router({
  list: publicProcedure.query(async () => {
    await sleep(2000);

    return db.batches;
  }),
});
