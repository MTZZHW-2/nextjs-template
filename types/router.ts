import type { NextRequest } from './api/request';
import type { NextResponse } from './api/response';
import type { MapToString } from './utils';

type RouterParams<T> = T;

export type RouterProps<T = unknown, M = unknown> = {
  params: RouterParams<T>;
  searchParams: M;
};

export type Page<T = unknown, M = unknown> = (
  props: RouterProps<T, M>,
) => Promise<React.JSX.Element> | React.JSX.Element;

export type Api<T = unknown, M = unknown> = (
  req: NextRequest<T>,
  props: RouterProps<MapToString<T>>,
) => Promise<NextResponse<M>>;
