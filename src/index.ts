import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

import { homePage } from 'utils';

import { createContext } from './trpc';
import { appRouter } from './trpc/router';

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// @ts-expect-error Upgrade express to v5
app.use('/', (_req, res) => {
  return res.type('html').send(homePage);
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
