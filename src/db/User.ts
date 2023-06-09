import { z } from 'zod';

export const USER_ROLES = ['administrator', 'apprentice', 'standard'] as const;

export const UserConfigSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  username: z.string(),
  imageUrl: z.string().optional(),
  role: z.enum(USER_ROLES),
});

export type User = z.infer<typeof UserConfigSchema>;

export type Users = ReadonlyArray<User>;
