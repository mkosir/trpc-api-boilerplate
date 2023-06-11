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
      <img src="https://raw.githubusercontent.com/mkosir/trpc-fe-boilerplate/main/misc/heisenberg.png" />
      <h3>tRPC API Boilerplate</h3>
      <br />
      <div style="color:black; font-style: italic; font-size: 18px;">
        <ul>
          User
          <li><a title="Query - ${BASE_URL}/trpc/user.list" href="${BASE_URL}/trpc/user.list">List</a></li>
          <li>
            <form method="get" action="${BASE_URL}/trpc/user.show">
              <button type="submit" title="Query - ${BASE_URL}/trpc/user.show">Show</button>
              User id: <input name="input" value="1f008731-4645-43de-8af9-3060d4086001">
            </form>
          </li>
        </ul>
        <ul>
          Batch
          <li><a title="Query - ${BASE_URL}/trpc/batch.list" href="${BASE_URL}/trpc/batch.list">List</a></li>
        </ul>
        <ul>
          Util
          <li>
            <form method="post" action="${BASE_URL}/trpc/util.seedDb">
              <button type="submit" title="Mutation - ${BASE_URL}/trpc/util.seedDb">Seed DB</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
    `);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
});
