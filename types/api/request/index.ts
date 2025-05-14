import type { NextRequest as _NextRequest } from 'next/server';
import type { NextURL } from 'next/dist/server/web/next-url';

export type NextRequest<T = unknown> = Omit<_NextRequest, 'nextUrl' | 'json'> & {
  nextUrl: Omit<NextURL, 'searchParams'> & {
    searchParams: Omit<URLSearchParams, 'get'> & {
      get: (param: keyof T) => string | undefined;
    };
  };
  json(): Promise<Partial<T>>;
};
