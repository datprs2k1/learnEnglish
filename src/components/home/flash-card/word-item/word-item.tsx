/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react';
import { Image } from 'antd';
import { useSpeechSynthesis } from 'react-speech-kit';
import { SoundOutlined, AudioOutlined } from '@ant-design/icons';
import { app } from '@/app-setting';
import { Space } from 'antd';

interface IWordItemProps {
  data: any;
  id: string;
}

export const WordItem: FC<IWordItemProps> = ({ data, id }) => {
  const { speak } = useSpeechSynthesis();

  const getTextToSpeech = (text: string) => {
    const textToSpeech = text.replace(/\(.*\)/gm, '');
    return textToSpeech;
  };

  return (
    <>
      <div className="relative w-full h-56 md:h-32 bg-slate-200 rounded-md md:rounded-xl mb-5">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 h-full text-base">
          <span className="flex justify-center items-center col-span-2">{data.term}</span>
          <span className="flex justify-center items-center col-span-2">{data.definition}</span>

          <div className="flex justify-center items-center">
            <Image
              src={`${app.RESOURCE_URL}/images/flashcards/${id}/${data.imageName}`}
              className="object-fill w-full md:w-3/4 rounded-3xl"
              height={104}
              width={104}
            />
          </div>
          <span className="absolute md:relative top-4 right-4 md:top-0 md:right-0 flex justify-center items-center cursor-pointer">
            <Space size="large">
              <SoundOutlined
                className="text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  speak({ text: getTextToSpeech(data.term) });
                }}
              />
              <AudioOutlined className="text-2xl" />
            </Space>
          </span>
        </div>
      </div>
    </>
  );
};
