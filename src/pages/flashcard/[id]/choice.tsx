import useSWR from 'swr';
import { ChoiceList } from '@/containers';
import { HomeLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
import { useFlashCard } from '@/hooks';
import { useRouter } from 'next/router';
interface IChoiceProps {}

export const Choice: NextPageWithLayout = (props) => {
  const router = useRouter();
  const id = router.query.id;
  const { GetById } = useFlashCard();

  const { data, isLoading } = useSWR(id ? `/api/flashcard/${id}` : null, () => GetById(id));

  return (
    <>
      <ChoiceList data={data?.flashCards || []} id={id} />
    </>
  );
};

Choice.Layout = HomeLayout;

export default Choice;
