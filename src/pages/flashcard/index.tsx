import { FC, useState, useEffect } from 'react';
import { Grid, Tabs, TabsProps, Layout } from 'antd';
import { FlashCardList } from '@/containers';
import { NextPageWithLayout } from '@/models';
import { HomeLayout } from '@/layouts';
import { useFlashCard } from '@/hooks';
import useSWR from 'swr';
const { useBreakpoint } = Grid;

interface IFlashCardProps {}

export const FlashCard: NextPageWithLayout = (props) => {
  const { GetList } = useFlashCard();

  const { data, isLoading } = useSWR(`/api/flashcard`, () => GetList());

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `List từ của tôi`,
      children: <FlashCardList data={data?.myList || []} type="my" />,
    },
    {
      key: '2',
      label: `Đang học`,
      children: <FlashCardList data={data?.learning || []} type="learn" />,
    },
    {
      key: '3',
      label: `Khám phá`,
      children: <FlashCardList data={data?.public || []} type="public" />,
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
