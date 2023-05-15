import { FlashCardCarousel } from '@/containers/flash-card';
import { HomeLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFlashCard } from '@/hooks';
import useSWR from 'swr';

export const Learn: NextPageWithLayout = () => {
  const [learn, setLearn] = useState<any>({
    current: 0,
    total: 0,
  });

  const router = useRouter();
  const id = router.query.id;
  const { GetById, GetLearnStatus } = useFlashCard();

  const { data, isLoading } = useSWR(id ? `/api/flashcard/${id}` : null, () => GetById(id));

  const { data: status } = useSWR(id ? `/api/flashcard/${id}/status` : null, () => GetLearnStatus(id));

  useEffect(() => {
    setLearn({
      ...learn,
      total: data?.flashCards.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (current: number) => {
    setLearn({
      ...learn,
      current,
    });
  };

  return <FlashCardCarousel data={data?.flashCards || []} handleChange={handleChange} id={id} />;
};

Learn.Layout = HomeLayout;

export default Learn;
