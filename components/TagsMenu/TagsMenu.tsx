'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NoteTag } from '@/types/note';
import css from './TagsMenu.module.css';

// Розширюємо NoteTag, додаючи "All"
const tags: ('All' | NoteTag)[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

<div className={css.menuContainer}>
  <button className={css.menuButton}>Notes ▾</button>
  <ul className={css.menuList}>
    {/* список тегів */}
    <li className={css.menuItem}>
      <a href={`url до сторінки за відповідним тегом`} className={css.menuLink}>
        Назва тегу
      </a>
    </li>
  </ul>
</div>;
