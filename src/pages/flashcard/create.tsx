import { FC } from 'react';
import { HomeLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
import { FlashCardForm } from '@/containers';

export const Create: NextPageWithLayout = () => {
  return (
    <>
      <h1>Create</h1>
      <FlashCardForm />
    </>
  );
};

Create.Layout = HomeLayout;

export default Create;
