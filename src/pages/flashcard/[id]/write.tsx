import useSWR from 'swr';
import { HomeLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
import { useFlashCard } from '@/hooks';
import { useRouter } from 'next/router';
import { WordList } from '@/containers/flash-card';
interface IWriteProps {}

export const Write: NextPageWithLayout = (props) => {
  const router = useRouter();
  const id = router.query.id;
  const { GetById } = useFlashCard();

  const { data, isLoading } = useSWR(id ? `/api/flashcard/${id}` : null, () => GetById(id));
  return (
    <>
      <WordList data={data?.flashCards} id={id} />
    </>
  );
};

Write.Layout = HomeLayout;

export default Write;
