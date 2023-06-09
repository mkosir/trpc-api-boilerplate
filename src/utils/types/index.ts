export type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> };
