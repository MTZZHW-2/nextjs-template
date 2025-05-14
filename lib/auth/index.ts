import { Lucia, TimeSpan } from 'lucia';
import type { User } from '@prisma/client';
import { adapter } from './adapter';

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(8, 'w'),
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

type DatabaseUserAttributes = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt' | 'lastSignInAt'>;

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
