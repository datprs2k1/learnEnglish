import { FC } from 'react';
import { Grid, Tabs, TabsProps, Layout } from 'antd';
import { FlashCardList } from '@/containers';
import { NextPageWithLayout } from '@/models';
import { HomeLayout } from '@/layouts';
const { useBreakpoint } = Grid;

interface IFlashCardProps {}

export const FlashCard: NextPageWithLayout = (props) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `List từ của tôi`,
      children: <FlashCardList type="my" />,
    },
    {
      key: '2',
      label: `Đang học`,
      children: <FlashCardList type="learn" />,
    },
    {
      key: '3',
      label: `Khám phá`,
      children: <FlashCardList type="discover" />,
    },
  ];

  const screens = useBreakpoint();

  return (
    <>
      <h1 className="text-4xl text-center" id="flashcard">
        Flash Card
      </h1>
      <Tabs defaultActiveKey="1" items={items} centered size="large" tabBarGutter={screens.md ? 200 : 50} />
    </>
  );
};

FlashCard.Layout = HomeLayout;

export default FlashCard;
