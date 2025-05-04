import * as _trpc_server from '@trpc/server';
import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';

type DeepMutable<TSourceType> = {
  -readonly [P in keyof TSourceType]: DeepMutable<TSourceType[P]>;
};

declare const appRouter: _trpc_server_unstable_core_do_not_import.BuiltRouter<
  {
    ctx: object;
    meta: object;
    errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
    transformer: true;
  },
  _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
    batch: _trpc_server_unstable_core_do_not_import.BuiltRouter<
      {
        ctx: object;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
      },
      _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        list: _trpc_server.TRPCQueryProcedure<{
          input: void;
          output: DeepMutable<{
            id: string;
            title: string;
            description: string | null;
            purity: number;
            weight: number;
            producers: {
              id: string;
              email: string;
              name: string;
              username: string;
              role: 'administrator' | 'apprentice' | 'standard';
              imageUrl?: string | undefined;
            }[];
            supplier: {
              id: string;
              name: string;
              description: string | null;
            } | null;
          }>[];
        }>;
      }>
    >;
    user: _trpc_server_unstable_core_do_not_import.BuiltRouter<
      {
        ctx: object;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
      },
      _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        list: _trpc_server.TRPCQueryProcedure<{
          input: void;
          output: DeepMutable<{
            id: string;
            email: string;
            name: string;
            username: string;
            role: 'administrator' | 'apprentice' | 'standard';
            imageUrl?: string | undefined;
          }>[];
        }>;
        show: _trpc_server.TRPCQueryProcedure<{
          input: string;
          output:
            | DeepMutable<{
                id: string;
                email: string;
                name: string;
                username: string;
                role: 'administrator' | 'apprentice' | 'standard';
                imageUrl?: string | undefined;
              }>
            | `User with id:${string} does not exist in database.`;
        }>;
        destroy: _trpc_server.TRPCMutationProcedure<{
          input: {
            id: string;
          };
          output: DeepMutable<{
            id: string;
            email: string;
            name: string;
            username: string;
            role: 'administrator' | 'apprentice' | 'standard';
            imageUrl?: string | undefined;
          }>[];
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
          input: {
            user: {
              email: string;
              name: string;
              username: string;
              role: 'administrator' | 'apprentice' | 'standard';
              imageUrl?: string | undefined;
            };
          };
          output: {
            id: string;
            email: string;
            name: string;
            username: string;
            role: 'administrator' | 'apprentice' | 'standard';
            imageUrl?: string | undefined;
          };
        }>;
      }>
    >;
    util: _trpc_server_unstable_core_do_not_import.BuiltRouter<
      {
        ctx: object;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
      },
      _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        seedDb: _trpc_server.TRPCMutationProcedure<{
          input: void;
          output: 'Database initialized successfully.';
        }>;
      }>
    >;
  }>
>;
type AppRouter = typeof appRouter;

declare const USER_ROLES: readonly ['administrator', 'apprentice', 'standard'];

type Square = {
  shape: 'square';
  size: number;
};
type Rectangle = {
  shape: 'rectangle';
  width: number;
  height: number;
};
type Shape = Square | Rectangle;
declare const SharedSquareObject: Shape;

export { type AppRouter, type Shape, SharedSquareObject, USER_ROLES };
