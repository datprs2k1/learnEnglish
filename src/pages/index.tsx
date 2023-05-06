import { NextPageWithLayout } from '@/models';
import { HomeLayout } from '@/layouts';
import { useAuth } from '@/hooks';

export const Index: NextPageWithLayout = () => {
  const { getUser } = useAuth();
  return (
    <>
      {}
      <h1>Home</h1>
    </>
  );
};

Index.Layout = HomeLayout;

export default Index;
