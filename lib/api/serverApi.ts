// lib\api\serverApi.ts

import axios from 'axios';
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

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const serverApi = (cookie?: string) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie, // передаємо кукі для SSR
    },
  });

// =======================
// Нотатки
// =======================

export const fetchNotesServer = async (
  cookie: string,
  params?: FetchNotesRequest,
): Promise<{ notes: Note[]; totalPages: number }> => {
  const { data } = await serverApi(cookie).get('/notes', { params });
  return data;
};

export const fetchNoteByIdServer = async (
  cookie: string,
  id: string,
): Promise<Note> => {
  const { data } = await serverApi(cookie).get(`/notes/${id}`);
  return data;
};

// =======================
// Користувач
// =======================

export const getMeServer = async (cookie: string): Promise<User> => {
  const { data } = await serverApi(cookie).get('/users/me');
  return data;
};

export const checkSessionServer = async (
  cookie: string,
): Promise<User | null> => {
  const { data } = await serverApi(cookie).get('/auth/session');
  return data || null;
};
