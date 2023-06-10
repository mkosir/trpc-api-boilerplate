import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

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

app.use('/', (_req, res) => {
  const baseUrl = `http://localhost:${process.env.PORT}/trpc`;

  return res.status(200).header('Content-Type', 'text/html').send(`
    <div>
      <h3>tRPC API Boilerplate</h3>
      <br />
      <div style="color:dimgray; font-style: italic; font-size: 18px;">
        <ul>
          <li><a title="${baseUrl}/user.list" href="${baseUrl}/user.list">User list</a></li>
          <li><a title="${baseUrl}/batch.list" href="${baseUrl}/batch.list">Batch list</a></li>
          <li><a title="${baseUrl}/util.seedDb" href="${baseUrl}/util.seedDb">Util - Seed DB</a></li>
        </ul>
      </div>
    </div>
    `);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}.`);
});
