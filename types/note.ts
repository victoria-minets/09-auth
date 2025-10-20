// Дозволені значення для тега
export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

// Основний тип нотатки
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

// Дані для створення нової нотатки
export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

// Відповідь від бекенду для списку нотаток
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
