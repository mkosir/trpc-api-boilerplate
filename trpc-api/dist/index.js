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
