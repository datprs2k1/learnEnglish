import { FC } from 'react';
import { Button, Row, Col, Avatar } from 'antd';
import { WordItem } from '@/components/home';
import { UserOutlined } from '@ant-design/icons';
interface IFlashCardListWordProps {
  data?: any;
  id: any;
  userName: string;
}

export const FlashCardListWord: FC<IFlashCardListWordProps> = ({ data, id, userName }) => {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={18}>
          {data.length > 0 ? (
            data.map((item: any) => <WordItem data={item} key={item.imageName} id={id} />)
          ) : (
            <p>Không có từ vựng nào</p>
          )}
        </Col>
        <Col span={6}>
          <div className="bg-slate-200 rounded-lg py-4">
            <div className="flex justify-center items-center">
              <Avatar size={64} style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}>
                {userName}
              </Avatar>
            </div>
            <h1 className="text-center mt-5">{userName}</h1>
          </div>
        </Col>
      </Row>
    </>
  );
};
