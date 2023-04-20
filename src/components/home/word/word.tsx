import { FC, useState, useEffect } from 'react';
import { Image, Button, Badge } from 'antd';
import { LetterBox } from './letter-box';
interface IWordProps {
  value: string;
  solution: string;
  data: string;
  submitted: boolean;
}

export const Word: FC<IWordProps> = ({ data, value, solution, submitted }) => {
  const [color, setColor] = useState<string[]>([]);
  useEffect(() => {
    let color: string[] = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] == solution[i]) {
        color.push('green');
      } else {
        color.push('gray');
      }
    }
    setColor(color);
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
                  <span className="flex justify-start break-words text-xl">{data}</span>
                  <div className="flex justify-end">
                    <Image
                      src="https://farm1.staticflickr.com/6/10835124_3e93a151e0.jpg"
                      className="object-fill w-full md:w-3/4 rounded-3xl"
                      height={104}
                      width={104}
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-16 mx-8">
                <span className="flex justify-start">Chọn thuật ngữ đúng</span>
                <div className="mt-4">
                  <div className="md:mx-4 w-full">
                    <div className={`grid grid-cols-5 gap-4 mx-auto mb-1`}>
                      {solution.split('').map((letter, i) => (
                        <LetterBox key={i} letter={value[i]} color={color[i]} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
