// app/(private routes)/profile/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getMeServer } from '@/lib/api/serverApi';
import type { Metadata } from 'next';

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
  // Отримуємо дані користувача на сервері
  const user = await getMeServer();

  // Фолбек аватара
  const avatarUrl = user.avatar || 'https://ac.goit.global/user/avatar.jpg';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
// ----------------------------

// import type { Metadata } from 'next';
// import { cookies } from 'next/headers';
// import ProfileClient from './ProfilePage.client';
// import { getMeServer } from '@/lib/api/serverApi';
// import css from './ProfilePage.module.css';

// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// // 🧠 Мета-теги для SEO
// export const metadata: Metadata = {
//   title: 'User Profile | NoteHub',
//   description: 'Profile page of the user in NoteHub application.',
//   keywords: ['NoteHub', 'profile', 'user', 'account'],
//   openGraph: {
//     title: 'User Profile | NoteHub',
//     description: 'View and edit your NoteHub profile.',
//     url: `${baseUrl}/profile`,
//     siteName: 'NoteHub',
//     type: 'profile',
//   },
// };

// export default async function ProfilePage() {
//   const queryClient = new QueryClient();

//   // ✅ Отримуємо кукі серверно
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore.get('next-auth.session-token')?.value || '';

//   // ✅ Prefetch користувача через serverApi
//   await queryClient.prefetchQuery({
//     queryKey: ['me'],
//     queryFn: () => getMeServer(cookieHeader),
//   });

//   return (
//     <main className={css.mainContent}>
//       <HydrationBoundary state={dehydrate(queryClient)}>
//         <ProfileClient />
//       </HydrationBoundary>
//     </main>
//   );
// }
