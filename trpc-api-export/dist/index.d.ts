import * as _trpc_server from '@trpc/server';

type DeepMutable<TSourceType> = {
  -readonly [P in keyof TSourceType]: DeepMutable<TSourceType[P]>;
};

declare const appRouter: _trpc_server.TRPCBuiltRouter<
  {
    ctx: object;
    meta: object;
    errorShape: _trpc_server.TRPCDefaultErrorShape;
    transformer: true;
  },
  _trpc_server.TRPCDecorateCreateRouterOptions<{
    batch: _trpc_server.TRPCBuiltRouter<
      {
        ctx: object;
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: true;
      },
      _trpc_server.TRPCDecorateCreateRouterOptions<{
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
          meta: object;
        }>;
      }>
    >;
    user: _trpc_server.TRPCBuiltRouter<
      {
        ctx: object;
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: true;
      },
      _trpc_server.TRPCDecorateCreateRouterOptions<{
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
          meta: object;
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
          meta: object;
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
          meta: object;
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
          meta: object;
        }>;
      }>
    >;
    util: _trpc_server.TRPCBuiltRouter<
      {
        ctx: object;
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: true;
      },
      _trpc_server.TRPCDecorateCreateRouterOptions<{
        seedDb: _trpc_server.TRPCMutationProcedure<{
          input: void;
          output: 'Database initialized successfully.';
          meta: object;
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
