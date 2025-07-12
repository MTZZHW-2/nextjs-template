import prisma from '#/lib/db/prisma';

export class UserService {
  public static async findOne(params: { username: string }) {
    const { username } = params;

    const options = {
      where: {
        username,
      },
    };

    const user = await prisma.user.findUnique(options);

    return user;
  }
  public static async createOne(params: { id: string; username: string; password: string }) {
    const options = {
      data: params,
    };

    await prisma.user.create(options);
  }
}
