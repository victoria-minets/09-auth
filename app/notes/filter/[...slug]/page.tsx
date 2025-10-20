import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';
import type { NoteTag } from '@/types/note';

interface Props {
  params: Promise<{ slug?: string[] }>;
}

type FilterTag = NoteTag | 'All';

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag: FilterTag = (slug?.[0] as FilterTag) || 'All';

  const readableTag = tag === 'All' ? 'All Notes' : `${tag} Notes`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const title = `${readableTag} | NoteHub`;
  const description =
    tag === 'All'
      ? 'Browse all your notes on NoteHub. Quickly access and manage your personal, work, and meeting notes.'
      : `View all ${tag.toLowerCase()} notes on NoteHub. Easily organize and manage your ${tag.toLowerCase()} notes in one place.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub ${tag} notes`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag: FilterTag = (slug?.[0] as FilterTag) || 'All';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
