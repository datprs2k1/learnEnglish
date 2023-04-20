import { ChoiceList } from '@/containers';
import { FC } from 'react';
import { HomeLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
interface IChoiceProps {}

export const Choice: NextPageWithLayout = (props) => {
  return (
    <>
      <ChoiceList />
    </>
  );
};

Choice.Layout = HomeLayout;

export default Choice;
