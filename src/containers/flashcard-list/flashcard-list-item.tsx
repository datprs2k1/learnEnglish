import { FC } from 'react';
import { Col, Card, Space, Tag, Button } from 'antd';
import { FileWordOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
interface IFlashCardListItemProps {
  data: any;
}

export const FlashCardListItem: FC<IFlashCardListItemProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Col span={12} md={{ span: 6 }}>
        <Link href={`/flashcard/${data.id}`}>
          <Card bordered={false} hoverable className="bg-gray-100 h-64 md:h-56">
            <p className="text-base font-bold">{data.name}</p>
            <p>
              <FileWordOutlined /> {data?.flashCards ? data.flashCards.length : 0} từ vựng
            </p>
            <p>
              <UserOutlined /> {data?.userLearn} người học
            </p>
            <div className="flex justify-between items-center mt-20 md:mt-8 lg:mt-12">
              <Button type="primary" className="w-full">
                Truy cập
              </Button>
            </div>
          </Card>
        </Link>
      </Col>
    </>
  );
};
