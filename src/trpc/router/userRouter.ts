import { z } from 'zod';

import { db, User, UserConfigSchema } from 'db';
import { sleep } from 'utils';

import { router, publicProcedure } from '../';

export const userRouter = router({
  list: publicProcedure.query(async () => {
    await sleep(2000);

    return db.users;
  }),

  show: publicProcedure.input(z.string().min(1)).query(({ input: userId }) => {
    const user = db.users.find((user) => user.id === userId);

    if (user) {
      return user;
    }

    return `User with id:${userId} does not exist in database.` as const;
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

      return newUser;
    }),
});
