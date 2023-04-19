import { FC, useState } from 'react';
import { Choice } from '@/components/home';
interface IChoiceListProps {}

export const ChoiceList: FC<IChoiceListProps> = (props) => {
  const [index, setIndex] = useState(0);
  const handleClick = (answer: any) => {
    setIndex(index + 1);
  };

  const result = () => {
    return <div>result</div>;
  };

  return (
    <>
      {new Array(10).fill(10).map((_, i) => {
        return index === i && <Choice data={i} key={i} hanleClick={handleClick} />;
      })}
      {index === 10 && result()}
    </>
  );
};
