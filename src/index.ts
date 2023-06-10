import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

import { createContext } from './trpc';
import { appRouter } from './trpc/router';

const BASE_URL = `http://localhost:${process.env.PORT}`;

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
  return res.status(200).header('Content-Type', 'text/html').send(`
    <div>
      <h3>tRPC API Boilerplate</h3>
      <br />
      <div style="color:dimgray; font-style: italic; font-size: 18px;">
        <ul>
          <li><a title="${BASE_URL}/trpc/user.list" href="${BASE_URL}/trpc/user.list">User list</a></li>
          <li><a title="${BASE_URL}/trpc/batch.list" href="${BASE_URL}/trpc/batch.list">Batch list</a></li>
          <li><a title="${BASE_URL}/trpc/util.seedDb" href="${BASE_URL}/trpc/util.seedDb">Util - Seed DB</a></li>
        </ul>
      </div>
    </div>
    `);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
});
