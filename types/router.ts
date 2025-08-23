import type React from 'react';
import type { NextRequest } from './api/request';
import type { NextResponse } from './api/response';

export type RouterProps<S = unknown> = {
  params: Promise<S>;
};

export type Page<S> = (props: RouterProps<S>) => Promise<React.JSX.Element> | React.JSX.Element;

export type Api<T = unknown, M = unknown, S = unknown> = (
  req: NextRequest<T>,
  props: RouterProps<S>,
) => Promise<NextResponse<M>>;
