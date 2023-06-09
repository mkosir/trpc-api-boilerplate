import { router } from '..';

import { batchRouter } from './batchRouter';
import { userRouter } from './userRouter';
import { utilsRouter } from './utilsRouter';

export const appRouter = router({
  batch: batchRouter,
  user: userRouter,
  utils: utilsRouter,
});

export type AppRouter = typeof appRouter;
