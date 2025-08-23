import { NextResponse as _NextResponse } from 'next/server';

export type Response<T> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      data?: never;
    };

export class NextResponse<T = unknown> extends _NextResponse<Awaited<Response<T>>> {}
