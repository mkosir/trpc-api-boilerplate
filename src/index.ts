import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

import { Batches, DeepMutable, Users, mockBatches, mockUsers } from 'utils';

import { createContext } from './trpc';
import { appRouter } from './trpc/router';

export const db = {
  users: structuredClone(mockUsers) as unknown as DeepMutable<Users>,
  batches: structuredClone(mockBatches) as unknown as DeepMutable<Batches>,
};

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use('/', (_req, res) => {
  return res.send('tRPC API Boilerplate');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}.`);
});
