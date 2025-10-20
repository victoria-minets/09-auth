import type { Metadata } from 'next';
import css from './page.module.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: '404 — Page Not Found | NoteHub',
  description:
    'The page you are looking for does not exist. Check the URL or return to the NoteHub home page.',

  openGraph: {
    title: '404 — Page Not Found | NoteHub',
    description:
      'This page could not be found. Go back to the main NoteHub page.',
    url: `${baseUrl}/not-found`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404 Page',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 — Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
