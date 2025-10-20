import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';
import css from './CreateNote.module.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description:
    'Create a new note in NoteHub. Organize your thoughts with ease.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description:
      'Create a new note in NoteHub. Organize your thoughts with ease.',
    url: `${baseUrl}/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note | NoteHub',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
