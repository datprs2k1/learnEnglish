import { FC } from 'react';
import { Col, Card, Space, Tag, Button } from 'antd';
import { FileWordOutlined } from '@ant-design/icons';
interface IFlashCardListItemProps {}

export const FlashCardListItem: FC<IFlashCardListItemProps> = (props) => {
  return (
    <>
      <Col span={12} md={{ span: 6 }}>
        <Card bordered={false} hoverable className="bg-gray-100 h-64 md:h-56">
          <p className="text-base font-bold">C17 IELTS listening test 1</p>
          <p>
            <FileWordOutlined /> 40 từ vựng
          </p>
          <Space size={[0, 8]} wrap>
            <Tag color="success">processing</Tag>
            <Tag color="processing">processing</Tag>
          </Space>
          <div className="flex justify-between items-center mt-8">
            <Button type="primary" className="w-full">
              Truy cập
            </Button>
          </div>
        </Card>
      </Col>
    </>
  );
};
