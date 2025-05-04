import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import superjson from 'superjson';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });
const t = initTRPC.create({ transformer: superjson });

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
