import bcrypt from 'bcrypt';
import { cookies as nextCookies } from 'next/headers';
import type { Api } from '#/types/router';
import { UserService } from '#/server/service/UserService';
import { lucia } from '#/lib/auth';
import { NextResponse } from '#/types/api/response';

export type LoginBody = {
  username: string;
  password: string;
};
export const POST: Api<LoginBody, void> = async (req) => {
  const cookies = await nextCookies();

  const { username, password } = await req.json();

  if (!username) {
    return NextResponse.json({ success: false, message: '缺少参数 username' });
  }
  if (!password) {
    return NextResponse.json({ success: false, message: '缺少参数 password' });
  }

  if (typeof username !== 'string' || username.length < 3 || username.length > 31 || !/^[a-z0-9-]+$/i.test(username)) {
    return NextResponse.json({ success: false, message: `用户名无效` });
  }
  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return NextResponse.json({ success: false, message: `密码无效` });
  }

  const user = await UserService.findOne({ username });
  if (!user) {
    return NextResponse.json({ success: false, message: `用户不存在` });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({ success: false, message: `密码错误` });
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return NextResponse.json(
    { success: true, message: '登录成功', data: undefined },
    {
      headers: new Headers({
        'x-authorization': `${session.id}`,
      }),
    },
  );
};
