import { FC } from 'react';
import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { SoundOutlined } from '@ant-design/icons';
import { Image } from 'antd';

interface IFlipCardProps {
  front: string;
  back: string;
  image: string;
}

export const FlipCard: FC<IFlipCardProps> = ({ front, back, image }) => {
  const [open, setOpen] = useState(false);
  const { speak } = useSpeechSynthesis();

  const getTextToSpeech = (text: string) => {
    const textToSpeech = text.replace(/\(.*\)/gm, '');
    return textToSpeech;
  };

  return (
    <div className="flex flex-col justify-center items-center text-center h-[250px] md:h-[400px] mx-auto rounded-md md:rounded-xl">
      <div
        className={`h-full w-full relative transition-all duration-500 [transform-style:preserve-3d] flex justify-center items-center cursor-pointer ${
          open ? '[transform:rotateX(180deg)]' : ''
        }`}
        onClick={(e) => setOpen(!open)}
      >
        <div className="absolute [backface-visibility:hidden] h-full w-full flex justify-center items-center">
          <div>
            <div className="top-4 left-4 absolute md:text-xl">
              <span className="text-bold">Thuật ngữ</span>
              <span
                className="ml-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  speak({ text: getTextToSpeech('Spectator (v,n)') });
                }}
              >
                <SoundOutlined />
              </span>
            </div>
            <span className="text-2xl md:text-3xl">Spectator (n) {front}</span>
          </div>
        </div>
        <div className="absolute [transform:rotateX(180deg)] [backface-visibility:hidden] h-full w-full flex justify-center items-center">
          <div className="grid grid-cols-2 gap-8 mx-10">
            <span className="top-4 left-4 absolute md:text-xl text-bold">Định nghĩa</span>
            <span className="flex justify-center items-center break-words text-2xl md:text-3xl">{back}</span>
            <div className="flex justify-center items-center">
              <Image src={image} className="object-fill rounded-3xl" rootClassName="w-full md:w-3/4" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
