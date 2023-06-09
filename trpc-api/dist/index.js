'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// trpc-api/export/index.ts
var export_exports = {};
__export(export_exports, {
  SharedSquare: () => SharedSquare,
  USER_ROLES: () => USER_ROLES,
});
module.exports = __toCommonJS(export_exports);

// src/utils/mocks/mockBatches.ts
var import_zod2 = require('zod');

// src/utils/mocks/mockUsers.ts
var import_zod = require('zod');
var USER_ROLES = ['administrator', 'apprentice', 'standard'];
var UserConfigSchema = import_zod.z.object({
  id: import_zod.z.string(),
  email: import_zod.z.string(),
  name: import_zod.z.string(),
  username: import_zod.z.string(),
  imageUrl: import_zod.z.string().optional(),
  role: import_zod.z.enum(USER_ROLES),
});
var baseImageUrl = 'https://raw.githubusercontent.com/mkosir/prisma-next-typescript/main/misc/user-images';
var mockUsers = [
  {
    id: '1f008731-4645-43de-8af9-3060d4086001',
    email: 'walter.white@mail.com',
    name: 'Walter White',
    username: 'Heisenberg',
    imageUrl: `${baseImageUrl}/heisenberg.jpg`,
    role: 'administrator',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086002',
    email: 'jesse.pinkman@mail.com',
    name: 'Jesse Pinkman',
    username: 'Jesse',
    imageUrl: `${baseImageUrl}/jesse.jpg`,
    role: 'apprentice',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086003',
    email: 'skyler.white@mail.com',
    name: 'Skyler White',
    username: 'Sky',
    imageUrl: `${baseImageUrl}/sky.jpg`,
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086004',
    email: 'hank.schrader@mail.com',
    name: 'Hank Schrader',
    username: 'Hank',
    imageUrl: `${baseImageUrl}/hank.jpg`,
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086005',
    email: 'marie.schrader@mail.com',
    name: 'Marie Schrader',
    username: 'Marie',
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086006',
    email: 'saul.goodman@mail.com',
    name: 'Saul Goodman',
    username: 'Jimmy',
    imageUrl: `${baseImageUrl}/jimmy.jpg`,
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086007',
    email: 'gustavo.fring@mail.com',
    name: 'Gustavo Fring',
    username: 'Gus',
    imageUrl: `${baseImageUrl}/gus.jpg`,
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086008',
    email: 'michael.ehrmantraut@mail.com',
    name: 'Michael Ehrmantraut',
    username: 'Mike',
    imageUrl: `${baseImageUrl}/mike.jpg`,
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086009',
    email: 'hector.salamanca@mail.com',
    name: 'Hector Salamanca',
    username: 'Tio',
    imageUrl: `${baseImageUrl}/tio.jpg`,
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086010',
    email: 'alberto.salamanca@mail.com',
    name: 'Alberto Salamanca',
    username: 'Tuco',
    role: 'standard',
  },
  {
    id: '1f008731-4645-43de-8af9-3060d4086011',
    email: 'gale.boetticher@mail.com',
    name: 'Gale Boetticher',
    username: 'Captain Nerd',
    role: 'apprentice',
  },
];

// src/utils/mocks/mockBatches.ts
var BatchConfigSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  title: import_zod2.z.string(),
  description: import_zod2.z.string().nullable(),
  purity: import_zod2.z.number().min(0).max(100),
  weight: import_zod2.z.number().positive({ message: 'Must be a positive number.' }),
  producers: UserConfigSchema.array(),
  supplier: import_zod2.z
    .object({
      id: import_zod2.z.string(),
      name: import_zod2.z.string(),
      description: import_zod2.z.string().nullable(),
    })
    .nullable(),
});
var mockBatches = [
  {
    id: '2f008731-4645-43de-8af9-3060d4086001',
    title: 'Blue Sky',
    description: 'summer batch',
    purity: 99.11,
    weight: 145.64,
    producers: [mockUsers[0], mockUsers[1]],
    supplier: {
      id: '3f008731-4645-43de-8af9-3060d4086001',
      name: 'Golden Moth Chemical',
      description: 'Golden bee company logo.',
    },
  },
  {
    id: '2f008731-4645-43de-8af9-3060d4086002',
    title: 'Blue Sky',
    description: 'bad batch',
    purity: 45.72,
    weight: 142.18,
    producers: [mockUsers[0], mockUsers[1]],
    supplier: {
      id: '3f008731-4645-43de-8af9-3060d4086002',
      name: 'Warehouse',
      description:
        "Lock security guard into portable toilet, don't roll but carry stolen barrel of methylamine, improvise as it goes...",
    },
  },
  {
    id: '2f008731-4645-43de-8af9-3060d4086003',
    title: 'Blue Sky',
    description: null,
    purity: 99.4,
    weight: 149.7,
    producers: [mockUsers[0]],
    supplier: null,
  },
  {
    id: '2f008731-4645-43de-8af9-3060d4086004',
    title: 'Blue Sky',
    description: null,
    purity: 98.64,
    weight: 146.51,
    producers: [mockUsers[1]],
    supplier: null,
  },
];

// trpc-api/export/index.ts
var SharedSquare = {
  shape: 'square',
  size: 50,
};
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    SharedSquare,
    USER_ROLES,
  });
