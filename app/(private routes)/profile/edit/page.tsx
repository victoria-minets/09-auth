// app/(private routes)/profile/edit/page.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import EditProfilePageClient from './EditProfilePage.client';
import { getMeServer } from '@/lib/api/serverApi';
import css from './EditProfilePage.module.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Edit Profile | NoteHub',
  description: 'Edit your profile information.',
  openGraph: {
    title: 'Edit Profile | NoteHub',
    description: 'Update your profile information in NoteHub.',
    url: `${baseUrl}/profile/edit`,
    siteName: 'NoteHub',
  },
};

export default async function EditProfilePage() {
  const queryClient = new QueryClient();

  // ✅ Prefetch користувача через serverApi
  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: () => getMeServer(), // ❌ без аргументів
  });

  return (
    <main className={css.mainContent}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditProfilePageClient />
      </HydrationBoundary>
    </main>
  );
}
// import {
//   QueryClient,
//   dehydrate,
//   HydrationBoundary,
// } from '@tanstack/react-query';
// import type { Metadata } from 'next';
// import { cookies } from 'next/headers';
// import EditProfilePageClient from './EditProfilePage.client';
// import { getMeServer } from '@/lib/api/serverApi';
// import css from './EditProfilePage.module.css';

// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// export const metadata: Metadata = {
//   title: 'Edit Profile | NoteHub',
//   description: 'Edit your profile information.',
//   openGraph: {
//     title: 'Edit Profile | NoteHub',
//     description: 'Update your profile information in NoteHub.',
//     url: `${baseUrl}/profile/edit`,
//     siteName: 'NoteHub',
//   },
// };

// export default async function EditProfilePage() {
//   const queryClient = new QueryClient();

//   // ✅ Отримуємо cookie серверно
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
//         <EditProfilePageClient />
//       </HydrationBoundary>
//     </main>
//   );
// }
