import { cache } from 'react';
import type { Session, User } from 'lucia';
import { cookies as nextCookies, headers as nextHeaders } from 'next/headers';
import { lucia } from './';

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const cookies = await nextCookies();
    const headers = await nextHeaders();

    const authorizationHeader = headers.get('Authorization');
    let sessionId = lucia.readBearerToken(authorizationHeader ?? '');

    if (!sessionId) {
      sessionId = cookies.get(lucia.sessionCookieName)?.value ?? null;
    }

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        headers.set('x-authorization', result.session.id);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        headers.set('x-authorization', '');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('auth validate request:', error);
    }
    return result;
  },
);
