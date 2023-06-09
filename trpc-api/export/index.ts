export type { AppRouter } from 'trpc/router';

export { USER_ROLES } from 'utils';

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
