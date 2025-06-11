import type { User } from 'lucia';
import type { Response } from '#/types/api/response';
import type { LoginBody } from '@/app/api/auth/login/route';
import type { RegisterBody } from '@/app/api/auth/register/route';

export const login = async (body: LoginBody): Promise<Response<void>> => {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  }).then((res) => res.json());
};

export const logout = async (): Promise<Response<void>> => {
  return fetch('/api/auth/logout', {
    method: 'POST',
    cache: 'no-store',
  }).then((res) => res.json());
};

export const register = async (body: RegisterBody): Promise<Response<void>> => {
  return fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  }).then((res) => res.json());
};

export const fetchUserProfile = async (): Promise<Response<User>> => {
  return fetch('/api/auth/profile', {
    cache: 'no-store',
  }).then((res) => res.json());
};
