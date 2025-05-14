type MapTo<T, K> = Record<keyof T, K>;

export type MapToString<T> = MapTo<T, string>;

export type ExcludeNull<T> = Exclude<T, null>;
