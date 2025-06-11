import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import type { Api } from '#/types/router';
import { UserService } from '#/server/service/UserService';
import { NextResponse } from '#/types/api/response';

export type RegisterBody = {
  username: string;
  password: string;
};
export const POST: Api<RegisterBody, void> = async (req) => {
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

  try {
    await UserService.createOne({
      id: uuidv4(),
      username,
      password: await bcrypt.hash(password, 10),
    });

    return NextResponse.json({ success: true, message: '注册成功', data: undefined });
  } catch (error) {
    return NextResponse.json({ success: false, message: `${error}` });
  }
};
