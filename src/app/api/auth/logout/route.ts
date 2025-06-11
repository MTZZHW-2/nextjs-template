import { cookies as nextCookies } from 'next/headers';
import type { Api } from '#/types/router';
import { lucia } from '#/lib/auth';
import { NextResponse } from '#/types/api/response';
import { validateRequest } from '#/lib/auth/server';

export const POST: Api<void, void> = async () => {
  const cookies = await nextCookies();
  const { session } = await validateRequest();
  if (!session) {
    return NextResponse.json({ message: '未登录', success: false });
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return NextResponse.json({ message: '登出成功', success: true, data: undefined });
};
