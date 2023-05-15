import useSWR, { useSWRConfig } from 'swr';
import { Button, Space, notification, Popconfirm } from 'antd';
import { FlashCardForm, FlashCardListForm, FlashCardListWord } from '@/containers/flash-card';
import { HomeLayout } from '@/layouts';
import Link from 'next/link';
import { NextPageWithLayout } from '@/models';
import { useFlashCard, useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const id = router.query.id;
  const { GetById, RemoveLearn } = useFlashCard();

  const { getUser } = useAuth();

  const { data, isLoading } = useSWR(id ? `/api/flashcard/${id}` : null, () => GetById(id));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');

  const [drawer, setDrawer] = useState<boolean>(false);

  const { mutate } = useSWRConfig();

  const onEdit = () => {
    setAction('edit');
    setIsOpen(true);
  };

  const onAddList = () => {
    setAction('add');
    setDrawer(true);
  };

  const onEditList = () => {
    setAction('edit');
    setDrawer(true);
  };

  const onClose = (isRefresh: boolean = false) => {
    setIsOpen(false);
    setDrawer(false);
    if (isRefresh) {
      mutate('/api/flashcard');
    }
  };

  const onRemove = async () => {
    try {
      await RemoveLearn(id);
      notification.success({
        message: 'Thông báo',
        description: 'Dừng học thành công',
      });

      await mutate(`/api/flashcard/${id}`);
    } catch (error: any) {
      notification.error({
        message: 'Thông báo',
        description: error.message,
      });
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl mb-10" id="flashcard">
              {data?.name}
            </h1>
            {data?.userID === getUser()?.id && (
              <Space size="large">
                <Button type="primary" size="large" onClick={() => onEdit()}>
                  Sửa
                </Button>
                <Button type="primary" size="large" onClick={() => onEdit()}>
                  Xoá
                </Button>
                <Button type="primary" size="large" onClick={() => onAddList()}>
                  Thêm từ mới
                </Button>
                <Button type="primary" size="large" onClick={() => onEditList()}>
                  Sửa danh sách từ
                </Button>
              </Space>
            )}
          </div>
          <div className="grid grid-cols-4 gap-5">
            {data?.flashCards?.length > 0 && (
              <Link href={`/flashcard/${id}/learn`}>
                <Button type="primary" size="large" className="w-full mb-10 py-10">
                  {data?.isLearn ? 'Tiếp tục học' : 'Bắt đầu học'}
                </Button>
              </Link>
            )}
            {data?.flashCards?.length > 0 && (
              <Link href={`/flashcard/${id}/choice`}>
                <Button
                  type="primary"
                  size="large"
                  className="w-full mb-10 py-10"
                  disabled={data?.flashCards?.length < 10}
                >
                  Trắc nghiệm
                </Button>
              </Link>
            )}
            {data?.flashCards?.length > 0 && (
              <Link href={`/flashcard/${id}/write`}>
                <Button type="primary" size="large" className="w-full mb-10 py-10">
                  Viết
                </Button>
              </Link>
            )}
            {data?.isLearn && (
              <Popconfirm
                title="Dừng học?"
                description="Bạn có chắc muốn dừng học không?"
                onConfirm={onRemove}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" size="large" danger>
                  Dừng học
                </Button>
              </Popconfirm>
            )}
          </div>
          <FlashCardListWord data={data?.flashCards || []} userName={data?.userName} id={id} />
        </>
      )}
      <FlashCardListForm isOpen={isOpen} onClose={onClose} action={action} id={id} />
      <FlashCardForm isOpen={drawer} onClose={onClose} action={action} id={id} />
    </>
  );
};

Index.Layout = HomeLayout;

export default Index;
