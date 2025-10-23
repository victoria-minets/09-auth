// app\(private routes)\notes\[id]\page.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);
  return {
    title: `Note: ${note.title} | NoteHub`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title} | NoteHub`,
      description: note.content.slice(0, 30),
      url: `${baseUrl}/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Preview of note: ${note.title}`,
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}

// import {
//   QueryClient,
//   dehydrate,
//   HydrationBoundary,
// } from '@tanstack/react-query';
// import { fetchNoteById } from '@/lib/api/clientApi';
// import NoteDetailsClient from './NoteDetails.client';
// import type { Metadata } from 'next';

// interface Props {
//   params: Promise<{ id: string }>;
// }

// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const note = await fetchNoteById(id);
//   return {
//     title: `Note: ${note.title} | NoteHub`,
//     description: note.content.slice(0, 30),
//     openGraph: {
//       title: `Note: ${note.title} | NoteHub`,
//       description: note.content.slice(0, 30),
//       url: `${baseUrl}/notes/${id}`,
//       images: [
//         {
//           url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
//           width: 1200,
//           height: 630,
//           alt: `Preview of note: ${note.title}`,
//         },
//       ],
//     },
//   };
// }

// export default async function NoteDetailsPage({ params }: Props) {
//   const { id } = await params;

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(id),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NoteDetailsClient noteId={id} />
//     </HydrationBoundary>
//   );
// }
