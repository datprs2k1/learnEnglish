import { Card, Col, Pagination, Row } from 'antd';
import { FC, useState, useEffect } from 'react';
import { FlashCardListItem } from './flashcard-list-item';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { FlashCardListForm } from '@/containers';
import { useFlashCard } from '@/hooks';
import { is } from './../../../.next/static/chunks/amp';
interface IFlashCardListProps {
  type?: 'my' | 'learn' | 'discover';
}

export const FlashCardList: FC<IFlashCardListProps> = ({ type = 'my' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');
  const [data, setData] = useState<any[]>([]);

  const { GetList } = useFlashCard();

  const getData = async () => {
    const res = await GetList(type);
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const renderTitle = () => {
    switch (type) {
      case 'my':
        return 'List từ của tôi';
      case 'learn':
        return 'Đang học';
      case 'discover':
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
      mutate();
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
        {data && data.map((x) => <FlashCardListItem data={x} key={x.id} />)}
      </Row>
      <Row gutter={[24, 24]} className="mt-10" justify="end">
        <Pagination
          defaultCurrent={1}
          total={100}
          pageSize={8}
          showSizeChanger={false}
          showQuickJumper
          onChange={onChange}
        />
      </Row>
      {type === 'my' && <FlashCardListForm isOpen={isOpen} onClose={onClose} />}
    </>
  );
};
