import type { User } from 'lucia';
import type { Api } from '#/types/router';
import { NextResponse } from '#/types/api/response';
import { validateRequest } from '#/lib/auth/server';

export const GET: Api<void, User> = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ success: false, message: '未登录' });
  }
  return NextResponse.json({ success: true, message: '获取用户信息成功', data: user });
};
