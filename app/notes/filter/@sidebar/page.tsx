'use client';

import Link from 'next/link';
import type { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

// Масив тегів (можна додати/змінити)
const tags: ('All' | NoteTag)[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`} // посилання на маршрут
            className={css.menuLink}
          >
            {tag === 'All' ? 'All notes' : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
