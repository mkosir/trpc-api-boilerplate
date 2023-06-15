export type { AppRouter } from 'trpc/router';

// Export user roles array as source of truth for frontend (select component, render list of available roles etc.)
export { USER_ROLES } from 'db/User';

// Export any backend type, object, array etc. that should be shared with frontend
type Square = {
  shape: 'square';
  size: number;
};
type Rectangle = {
  shape: 'rectangle';
  width: number;
  height: number;
};
export type Shape = Square | Rectangle;

export const SharedSquareObject: Shape = {
  shape: 'square',
  size: 50,
};
