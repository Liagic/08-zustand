import { getSingleNote } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
