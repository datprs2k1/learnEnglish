import { Card, Col, Pagination, Row } from 'antd';
import { FC, useState, useEffect } from 'react';
import { FlashCardListItem } from './flashcard-list-item';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { FlashCardListForm } from '@/containers';
import { useFlashCard } from '@/hooks';
import { useSWRConfig } from 'swr';

interface IFlashCardListProps {
  type?: 'my' | 'learn' | 'public';
  data: any[];
}

export const FlashCardList: FC<IFlashCardListProps> = ({ type = 'my', data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');

  const { mutate } = useSWRConfig();

  const renderTitle = () => {
    switch (type) {
      case 'my':
        return 'List từ của tôi';
      case 'learn':
        return 'Đang học';
      case 'public':
        return 'Khám phá';
      default:
        return 'List từ của tôi';
    }
  };

  const onAdd = () => {
    setAction('add');
    setIsOpen(true);
  };

  const onClose = (isRefresh: boolean) => {
    setIsOpen(false);
    if (isRefresh) {
      mutate('/api/flashcard');
    }
  };

  const onChange = () => {
    var flashcard = document.getElementById('flashcard');
    flashcard?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <h1>{renderTitle()}</h1>
      <Row gutter={[24, 24]} className="mt-10">
        {type === 'my' && (
          <Col span={12} md={{ span: 6 }}>
            <Card
              bordered={false}
              hoverable
              className="bg-gray-100 h-64 md:h-56 flex justify-center items-center"
              onClick={() => onAdd()}
            >
              <PlusOutlined className="flex justify-center mb-5 text-2xl" />
              <span className="text-2xl">Tạo danh sách mới</span>
            </Card>
          </Col>
        )}
        {data && data.map((x: any) => <FlashCardListItem data={x} key={x.id} />)}
      </Row>
      <Row gutter={[24, 24]} className="mt-20" justify="end">
        <Pagination
          defaultCurrent={1}
          total={100}
          pageSize={8}
          showSizeChanger={false}
          showQuickJumper
          onChange={onChange}
        />
      </Row>
      {type === 'my' && <FlashCardListForm isOpen={isOpen} onClose={onClose} action={action} />}
    </>
  );
};
