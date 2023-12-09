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

// trpc-api-export/builder/index.ts
var builder_exports = {};
__export(builder_exports, {
  SharedSquareObject: () => SharedSquareObject,
  USER_ROLES: () => USER_ROLES,
});
module.exports = __toCommonJS(builder_exports);

// src/db/User.ts
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

// trpc-api-export/builder/index.ts
var SharedSquareObject = {
  shape: 'square',
  size: 50,
};
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    SharedSquareObject,
    USER_ROLES,
  });
