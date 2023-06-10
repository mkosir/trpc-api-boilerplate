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
  return res.status(200).header('Content-Type', 'text/html').send(`
    <div>
      <h3>tRPC API Boilerplate</h3>
      <br />
      <div style="color:dimgray; font-style: italic; font-size: 18px;">
        <ul>
          <li><a title="http://localhost:4000/trpc/user.list" href="http://localhost:4000/trpc/user.list">User list</a></li>
          <li><a title="http://localhost:4000/trpc/batch.list" href="http://localhost:4000/trpc/batch.list">Batch list</a></li>
          <li><a title="http://localhost:4000/trpc/util.seedDb" href="http://localhost:4000/trpc/util.seedDb">Util - Seed DB</a></li>
        </ul>
      </div>
    </div>
    `);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}.`);
});
