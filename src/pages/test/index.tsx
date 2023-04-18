import { FC, useState } from 'react';
import { NextPageWithLayout } from '@/models';
import { HomeLayout } from '@/layouts';
import { FlashCardCarousel } from '@/containers';

export const Test: NextPageWithLayout = () => {
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

Test.Layout = HomeLayout;

export default Test;
