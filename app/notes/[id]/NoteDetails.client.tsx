'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface Props {
  noteId?: string;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const params = useParams();

  // Перевіряємо тип
  let id: string | undefined = noteId;
  if (!id) {
    if (typeof params.id === 'string') id = params.id;
    else if (Array.isArray(params.id)) id = params.id[0]; // беремо перший елемент
  }

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    enabled: !!id, // запит виконується тільки якщо id визначено
    refetchOnMount: false, // уникаємо дублюючого запиту після SSR-prefetch
  });

  if (!id) return <p>Note ID is missing.</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
