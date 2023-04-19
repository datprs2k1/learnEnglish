import { FlashCardCarousel } from '@/containers';
import { HomeLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
import { useState } from 'react';

export const View: NextPageWithLayout = () => {
  const [learn, setLearn] = useState({
    current: 1,
    total: 10,
  });

  const handleChange = (current: number) => {
    setLearn({
      ...learn,
      current,
    });
  };

  const data = [
    {
      front: 'front 1',
      back: 'back 1',
      image: 'https://picsum.photos/200/300',
    },
    {
      front: 'front 2',
      back: 'back 2',
      image: 'https://picsum.photos/200/300',
    },
  ];
  return <FlashCardCarousel data={data} handleChange={handleChange} />;
};

View.Layout = HomeLayout;

export default View;
