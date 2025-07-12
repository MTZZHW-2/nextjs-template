import { Lucia, TimeSpan } from 'lucia';
import { adapter } from './adapter';
import type { User } from '#/server/model/client';

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(8, 'w'),
  sessionCookie: {
    attributes: {
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
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
