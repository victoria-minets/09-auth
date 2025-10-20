// // \app\layout.tsx

// import type { Metadata } from 'next';
// import { Roboto } from 'next/font/google';

// import './globals.css';

// import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
// import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';

// import AuthProvider from '@/components/AuthProvider/AuthProvider';

// const roboto = Roboto({
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-roboto',
//   subsets: ['latin'],
//   display: 'swap', // швидке відображення шрифту
// });

// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// export const metadata: Metadata = {
//   title: 'NoteHub',
//   description: 'NoteHub - is simple note-taking app',
//   openGraph: {
//     title: 'NoteHub - is simple note-taking app',
//     description: "Let's create, edit and organize your notes.",
//     url: `${baseUrl}`,
//     images: [
//       {
//         url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'NoteHub Open Graph Image',
//       },
//     ],
//   },
// };

// export default function RootLayout({
//   children,
//   modal,
// }: {
//   children: React.ReactNode;
//   modal: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={roboto.variable}>
//       <body>
//         <TanStackProvider>
//           <AuthProvider>
//             <Header />
//             <main>
//               {children}
//               {modal}
//             </main>
//             <Footer />
//           </AuthProvider>
//         </TanStackProvider>
//         <div id="modal-root" />
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getMe } from '@/lib/api/clientApi';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub - is simple note-taking app',
  openGraph: {
    title: 'NoteHub - is simple note-taking app',
    description: "Let's create, edit and organize your notes.",
    url: `${baseUrl}`,
  },
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  // 🧠 Попередньо отримуємо користувача на сервері
  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: () => getMe().catch(() => null),
  });

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthProvider>
              <Header />
              <main>
                {children}
                {modal}
              </main>
              <Footer />
            </AuthProvider>
          </HydrationBoundary>
        </TanStackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
