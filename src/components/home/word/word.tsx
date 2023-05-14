import { FC, useState, useEffect } from 'react';
import { Image, Button, Badge } from 'antd';
import { LetterBox } from './letter-box';
import { app } from '@/app-setting';
interface IWordProps {
  value: string;
  solution: string;
  data: any;
  submitted: boolean;
  onCorrect: any;
  id: string;
}

export const Word: FC<IWordProps> = ({ data, value, solution, submitted, onCorrect, id }) => {
  const [color, setColor] = useState<string[]>([]);
  useEffect(() => {
    if (submitted) {
      const color = solution
        .split('')
        .map((letter, i) => (letter.toUpperCase() === value[i].toUpperCase() ? 'green' : 'yellow'));

      setColor(color);

      if (value.toUpperCase() === solution.toUpperCase()) {
        onCorrect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center mx-auto rounded-md md:rounded-xl">
        <div className={`h-full w-full relative flex justify-center items-center`}>
          <div className="h-full w-full flex justify-center items-center mx-8">
            <div className="absolute h-full w-full">
              <div className="w-full">
                <span className="top-4 left-8 absolute md:text-xl text-bold">Định nghĩa</span>
                <div className="mt-12 md:mt-16 grid grid-cols-2 gap-8 mx-8 ">
                  <span className="flex justify-start break-words text-xl">{data.definition as string}</span>
                  <div className="flex justify-end">
                    <Image
                      src={`${app.RESOURCE_URL}/images/flashcards/${id}/${data.imageName}`}
                      className="object-fill w-full md:w-3/4 rounded-3xl"
                      height={104}
                      width={104}
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-16 mx-8">
                <span className="flex justify-start text-2xl">Viết câu trả lời</span>
                <div className="mt-8">
                  <div className="md:mx-4 w-full">
                    <div className={`grid ${solution} ? grid-cols-${solution.length} : grid-cols-5 gap-4 mx-auto mb-1`}>
                      {solution.split('').map((letter, i) => (
                        <LetterBox key={i} letter={value[i] || ''} color={color[i]} />
                      ))}
                    </div>
                  </div>
                </div>

                {submitted && (
                  <div className="mt-10">
                    <span className="flex justify-start text-2xl">Đáp án</span>
                    <div className="md:mx-4 w-full mt-5">
                      <div
                        className={`grid ${solution} ? grid-cols-${solution.length} : grid-cols-5 gap-4 mx-auto mb-1`}
                      >
                        {solution.split('').map((letter, i) => (
                          <LetterBox key={i} letter={solution[i]} color="green" />
                        ))}
                      </div>
                      <h1 className="mt-10">Nhấn phím Entert để tiếp tục.</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
