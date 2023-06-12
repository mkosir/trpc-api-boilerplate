import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

import { homePage } from 'utils';

import { createContext } from './trpc';
import { appRouter } from './trpc/router';

const PORT = process.env.PORT ?? 4000;
const BASE_URL = `http://localhost:${PORT}`;

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
  return res.type('html').send(homePage);
});

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
});
