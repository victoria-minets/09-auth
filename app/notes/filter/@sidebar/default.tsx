import Link from 'next/link';
import type { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

// Масив тегів для фільтрації
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
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag === 'All' ? 'All notes' : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
