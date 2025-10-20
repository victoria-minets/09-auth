import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap', // швидке відображення шрифту
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub - is simple note-taking app',
  openGraph: {
    title: 'NoteHub - is simple note-taking app',
    description: "Let's create, edit and organize your notes.",
    url: `${baseUrl}`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Open Graph Image',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
