import { FC, useEffect, useRef, useState } from 'react';
import { Button, Carousel, ConfigProvider, Progress } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { CheckOutlined, CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FlipCard } from '@/components/home';

interface IFlashCardCarouselProps {
  data: any;
  id: any;
  handleChange: (current: number) => void;
}

export const FlashCardCarousel: FC<IFlashCardCarouselProps> = ({ data, handleChange, id }) => {
  const carousel = useRef<CarouselRef>(null);

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const onChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
    handleChange(currentSlide + 1);
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
      <h1 className="text-center text-2xl">
        Đang học: {currentSlide + 1}/{data?.length}
      </h1>

      <div className="relative h-[320px] md:h-[480px] bg-slate-200 rounded-md md:rounded-md">
        <Carousel ref={carousel} dots={false} afterChange={onChange} effect="scrollx">
          {data.map((value, index) => (
            <div key={index}>
              <FlipCard front={value.term} back={value.definition} image={value.imageName} id={id} />
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
                icon={<LeftOutlined />}
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
                icon={<RightOutlined />}
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
