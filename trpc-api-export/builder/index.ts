export type { AppRouter } from 'trpc/router';

// Export user roles array as source of truth for frontend (select component, render list of available roles etc.)
export { USER_ROLES } from 'db/User';

// Export any backend types, objects etc. that should be shared with frontend
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

export const SharedSquare: Shape = {
  shape: 'square',
  size: 50,
};
