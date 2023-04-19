import { ChoiceList } from '@/containers';
import { FC } from 'react';
import { HomeLayout } from '@/layouts';
interface IChoiceProps {}

export const Choice: FC<IChoiceProps> = (props) => {
  return (
    <>
      <ChoiceList />
    </>
  );
};

Choice.Layout = HomeLayout;

export default Choice;
