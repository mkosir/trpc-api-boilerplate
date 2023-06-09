/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { z } from 'zod';

const envVariables = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  PORT: z.string(),
});

declare global {
  namespace NodeJS {
    type ProcessEnv = z.infer<typeof envVariables>;
  }
}
