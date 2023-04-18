import { FC, useEffect, useRef, useState } from 'react';
import { Button, Carousel, ConfigProvider, Progress } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FlipCard } from '@/components/home';

interface IFlashCardCarouselProps {
  data: any;
  handleChange: (current: number) => void;
}

export const FlashCardCarousel: FC<IFlashCardCarouselProps> = ({ data, handleChange }) => {
  const carousel = useRef<CarouselRef>(null);

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const onChange = (from: number, to: number) => {
    setCurrentSlide(from);
    handleChange(to + 1);
  };

  const update = async (type: number) => {
    console.log('update', currentSlide, type);
    if (type === 1) {
    }
  };

  const onLearn = async (type: number) => {
    await update(type);
    carousel.current?.next();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-8 mb-10 text-xl">
        <div className="text-start">
          <span className=" text-orange-600 font-semibold mr-2 px-5 py-0.5 rounded-full border-solid border-orange-600">
            11
          </span>
          <span className="font-medium md:text-xl">Đang học</span>
        </div>
        <div className="text-right font-semibold">
          <span className="font-medium md:text-xl mr-2">Đã biết</span>
          <span className=" text-green-600 font-semibold px-5 py-0.5 rounded-full border-solid border-green-600">
            11
          </span>
        </div>
      </div>
      <div className="relative h-[320px] md:h-[480px] bg-slate-200 rounded-md md:rounded-md">
        <Carousel ref={carousel} dots={false} beforeChange={onChange} effect="scrollx">
          {data.map((value, index) => (
            <div key={index}>
              <FlipCard front={value.front} back={value.back} image={value.image} />
            </div>
          ))}
        </Carousel>
        <div className="grid grid-cols-2 gap-24 md:gap-40 mx-8">
          <div className="flex justify-end">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#ff7875',
                  fontSize: 20,
                  controlHeight: 40,
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => onLearn(1)}
                ghost
              />
            </ConfigProvider>
          </div>
          <div className="">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#00b96b',
                  controlHeight: 40,
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                shape="circle"
                icon={<CheckOutlined />}
                onClick={() => onLearn(1)}
                ghost
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};
