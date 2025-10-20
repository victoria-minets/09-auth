// app\(private routes)\profile\page.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import ProfileClient from './ProfilePage.client';
import { getMeServer } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// 🧠 Мета-теги для SEO
export const metadata: Metadata = {
  title: 'User Profile | NoteHub',
  description: 'Profile page of the user in NoteHub application.',
  keywords: ['NoteHub', 'profile', 'user', 'account'],
  openGraph: {
    title: 'User Profile | NoteHub',
    description: 'View and edit your NoteHub profile.',
    url: `${baseUrl}/profile`,
    siteName: 'NoteHub',
    type: 'profile',
  },
};

export default async function ProfilePage() {
  const queryClient = new QueryClient();

  // ✅ Отримуємо кукі серверно
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get('next-auth.session-token')?.value || '';

  // ✅ Prefetch користувача через serverApi
  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: () => getMeServer(cookieHeader),
  });

  return (
    <main className={css.mainContent}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileClient />
      </HydrationBoundary>
    </main>
  );
}
