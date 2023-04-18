import { NextPageWithLayout } from '@/models';
import { HomeLayout } from '@/layouts';

export const Index: NextPageWithLayout = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

Index.Layout = HomeLayout;

export default Index;
