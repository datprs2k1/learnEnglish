import { FC } from 'react';
import { NextPageWithLayout } from '@/models';
import { AdminLayout } from '@/layouts';

export const AdminIndex: NextPageWithLayout = () => {
  return (
    <div>
      <h1>ABC</h1>
    </div>
  );
};

AdminIndex.Layout = AdminLayout;

export default AdminIndex;
