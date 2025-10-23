// lib/api/serverApi.ts
import axios, { type AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import type { Note } from '../../types/note';
import type { User } from '../../types/user';

// =======================
// Типи запитів
// =======================
export interface FetchNotesRequest {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

// =======================
// Базовий axios екземпляр для серверного API
// =======================
const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const serverApi = (cookie?: string) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie, // передаємо кукі для SSR
    },
    withCredentials: true,
  });

// =======================
// Допоміжна функція для отримання cookie header
// =======================
const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) return undefined;
  return `accessToken=${accessToken}; refreshToken=${refreshToken}`;
};

// =======================
// Нотатки (SSR)
// =======================
export const fetchNotesServer = async (
  params?: FetchNotesRequest,
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await serverApi(cookieHeader).get('/notes', { params });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await serverApi(cookieHeader).get(`/notes/${id}`);
  return data;
};

// =======================
// Користувач (SSR)
// =======================
export const getMeServer = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await serverApi(cookieHeader).get('/users/me');
  return data;
};

// =======================
// Перевірка сесії для middleware
// =======================
export const checkSessionServer = async (): Promise<
  AxiosResponse<User | null>
> => {
  const cookieHeader = await getCookieHeader();

  const response = await serverApi(cookieHeader).get<User | null>(
    '/auth/session',
    {
      validateStatus: () => true, // щоб не падало при 401
    },
  );

  return response; // повертаємо весь об'єкт Axios для отримання set-cookie
};

// // lib\api\serverApi.ts

// import axios from 'axios';
// import type { Note } from '../../types/note';
// import type { User } from '../../types/user';

// // =======================
// // Типи запитів
// // =======================

// export interface FetchNotesRequest {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   tag?: string;
// }

// // =======================
// // Базовий axios екземпляр для серверного API
// // =======================

// const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

// const serverApi = (cookie?: string) =>
//   axios.create({
//     baseURL,
//     headers: {
//       'Content-Type': 'application/json',
//       Cookie: cookie, // передаємо кукі для SSR
//     },
//   });

// // =======================
// // Нотатки
// // =======================

// export const fetchNotesServer = async (
//   cookie: string,
//   params?: FetchNotesRequest,
// ): Promise<{ notes: Note[]; totalPages: number }> => {
//   const { data } = await serverApi(cookie).get('/notes', { params });
//   return data;
// };

// export const fetchNoteByIdServer = async (
//   cookie: string,
//   id: string,
// ): Promise<Note> => {
//   const { data } = await serverApi(cookie).get(`/notes/${id}`);
//   return data;
// };

// // =======================
// // Користувач
// // =======================

// export const getMeServer = async (cookie: string): Promise<User> => {
//   const { data } = await serverApi(cookie).get('/users/me');
//   return data;
// };

// export const checkSessionServer = async (
//   cookie: string,
// ): Promise<User | null> => {
//   const { data } = await serverApi(cookie).get('/auth/session');
//   return data || null;
// };
