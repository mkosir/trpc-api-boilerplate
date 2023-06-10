import { router } from '..';

import { batchRouter } from './batchRouter';
import { userRouter } from './userRouter';
import { utilRouter } from './utilRouter';

export const appRouter = router({
  batch: batchRouter,
  user: userRouter,
  util: utilRouter,
});

export type AppRouter = typeof appRouter;
