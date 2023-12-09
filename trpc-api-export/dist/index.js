// src/db/User.ts
import { z } from 'zod';
var USER_ROLES = ['administrator', 'apprentice', 'standard'];
var UserConfigSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  username: z.string(),
  imageUrl: z.string().optional(),
  role: z.enum(USER_ROLES),
});

// trpc-api-export/builder/index.ts
var SharedSquareObject = {
  shape: 'square',
  size: 50,
};
export { SharedSquareObject, USER_ROLES };
