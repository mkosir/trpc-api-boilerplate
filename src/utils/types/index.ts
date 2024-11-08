export type DeepMutable<TSourceType> = { -readonly [P in keyof TSourceType]: DeepMutable<TSourceType[P]> };
