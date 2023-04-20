import { NextPageWithLayout } from '@/models';
import { WordList } from '@/containers';
import { HomeLayout } from '@/layouts';
interface IWordProps {}

export const Word: NextPageWithLayout = (props) => {
  return (
    <>
      <WordList />
    </>
  );
};

Word.Layout = HomeLayout;

export default Word;
