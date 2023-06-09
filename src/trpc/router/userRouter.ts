import { z } from 'zod';

import { db } from 'index';
import { User, UserConfigSchema, sleep } from 'utils';

import { router, publicProcedure } from '../';

export const userRouter = router({
  list: publicProcedure.query(async () => {
    await sleep(2000);

    return db.users;
  }),

  destroy: publicProcedure.input(z.object({ id: z.string().min(1) })).mutation(({ input: { id } }) => {
    const index = db.users.findIndex((user) => user.id === id);

    if (index > -1) {
      const deletedUser = db.users.splice(index, 1);
      return deletedUser;
    }

    return null;
  }),

  create: publicProcedure
    .input(z.object({ user: UserConfigSchema.omit({ id: true }) }))
    .mutation(({ input: { user } }) => {
      const newUser: User = { id: crypto.randomUUID(), ...user };

      db.users.push(newUser);
    }),
});
