// lib/clientApi.ts
import { api } from './api';
import type { Note, CreateNoteRequest } from '../../types/note';
import type { User } from '../../types/user';

// =======================
// Типи запитів
// =======================

// Запит для фільтрації та пагінації нотаток
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

// Дані для реєстрації
export interface RegisterRequest {
  email: string;
  password: string;
}

// Дані для логіну
export interface LoginRequest {
  email: string;
  password: string;
}

// =======================
// Нотатки
// =======================

export const fetchNotes = (
  params?: FetchNotesParams,
): Promise<{ notes: Note[]; totalPages: number }> =>
  api
    .get<{ notes: Note[]; totalPages: number }>('/notes', { params })
    .then((res) => res.data);

export const fetchNoteById = (id: string): Promise<Note> =>
  api.get<Note>(`/notes/${id}`).then((res) => res.data);

export const createNote = (data: CreateNoteRequest): Promise<Note> =>
  api.post<Note>('/notes', data).then((res) => res.data);

export const deleteNote = (id: string): Promise<Note> =>
  api.delete<Note>(`/notes/${id}`).then((res) => res.data);

// =======================
// Авторизація / користувач
// =======================

export const register = async (data: RegisterRequest): Promise<User> => {
  const { data: user } = await api.post<User>('/auth/register', data);
  return user;
};

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<User> => {
  const { data: user } = await api.post<User>('/auth/login', {
    email,
    password,
  });
  return user;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = (): Promise<User | null> =>
  api.get<User | null>('/auth/session').then((res) => res.data ?? null);

export const getMe = (): Promise<User> =>
  api.get<User>('/users/me').then((res) => res.data);

export const updateMe = (data: Partial<User>): Promise<User> =>
  api.patch<User>('/users/me', data).then((res) => res.data);

// lib/clientApi.ts
// import { api } from './api';
// import type { Note, CreateNoteRequest } from '@/types/note';
// import type { User } from '@/types/user';

// // =======================
// // Типи запитів
// // =======================

// export interface FetchNotesParams {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   tag?: string;
// }

// export interface RegisterRequest {
//   email: string;
//   password: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// // =======================
// // Нотатки
// // =======================

// export const fetchNotes = async (
//   params?: FetchNotesParams,
// ): Promise<{ notes: Note[]; totalPages: number }> => {
//   try {
//     const res = await api.get<{ notes: Note[]; totalPages: number }>('/notes', {
//       params,
//     });
//     return res.data;
//   } catch (err: unknown) {
//     console.error(
//       'fetchNotes error:',
//       err instanceof Error ? err.message : err,
//     );
//     return { notes: [], totalPages: 0 };
//   }
// };

// export const fetchNoteById = async (id: string): Promise<Note | null> => {
//   try {
//     const res = await api.get<Note>(`/notes/${id}`);
//     return res.data;
//   } catch (err: unknown) {
//     console.error(
//       'fetchNoteById error:',
//       err instanceof Error ? err.message : err,
//     );
//     return null;
//   }
// };

// export const createNote = async (
//   data: CreateNoteRequest,
// ): Promise<Note | null> => {
//   try {
//     const res = await api.post<Note>('/notes', data);
//     return res.data;
//   } catch (err: unknown) {
//     console.error(
//       'createNote error:',
//       err instanceof Error ? err.message : err,
//     );
//     return null;
//   }
// };

// export const deleteNote = async (id: string): Promise<Note | null> => {
//   try {
//     const res = await api.delete<Note>(`/notes/${id}`);
//     return res.data;
//   } catch (err: unknown) {
//     console.error(
//       'deleteNote error:',
//       err instanceof Error ? err.message : err,
//     );
//     return null;
//   }
// };

// // =======================
// // Авторизація / користувач
// // =======================

// export const register = async (data: RegisterRequest): Promise<User | null> => {
//   try {
//     const res = await api.post<User>('/auth/register', data);
//     return res.data;
//   } catch (err: unknown) {
//     console.error('register error:', err instanceof Error ? err.message : err);
//     return null;
//   }
// };

// export const login = async (data: LoginRequest): Promise<User | null> => {
//   try {
//     const res = await api.post<User>('/auth/login', data);
//     return res.data;
//   } catch (err: unknown) {
//     console.error('login error:', err instanceof Error ? err.message : err);
//     return null;
//   }
// };

// export const logout = async (): Promise<void> => {
//   try {
//     await api.post('/auth/logout');
//   } catch (err: unknown) {
//     console.error('logout error:', err instanceof Error ? err.message : err);
//   }
// };

// export const checkSession = async (): Promise<User | null> => {
//   try {
//     const res = await api.get<User>('/auth/session');
//     return res.data ?? null;
//   } catch (err: unknown) {
//     console.error(
//       'checkSession error:',
//       err instanceof Error ? err.message : err,
//     );
//     return null;
//   }
// };

// export const getMe = async (): Promise<User | null> => {
//   try {
//     const res = await api.get<User>('/users/me');
//     return res.data ?? null;
//   } catch (err: unknown) {
//     console.error('getMe error:', err instanceof Error ? err.message : err);
//     return null;
//   }
// };

// export const updateMe = async (data: Partial<User>): Promise<User | null> => {
//   try {
//     const res = await api.patch<User>('/users/me', data);
//     return res.data ?? null;
//   } catch (err: unknown) {
//     console.error('updateMe error:', err instanceof Error ? err.message : err);
//     return null;
//   }
// };
