import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0];
  const normalizedTag = tag === 'all' ? '' : tag;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, normalizedTag],
    queryFn: () => fetchNotes('', 1, 12, normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
