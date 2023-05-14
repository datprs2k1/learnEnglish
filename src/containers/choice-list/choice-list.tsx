import { FC, useState, useEffect } from 'react';
import { Choice } from '@/components/home';
import { Result } from 'antd';
interface IChoiceListProps {
  data: any[];
  id: any;
}

export const ChoiceList: FC<IChoiceListProps> = ({ data, id }) => {
  const [index, setIndex] = useState(0);
  const [list, setList] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  const handleClick = (result: boolean) => {
    if (result) {
      setScore(score + 1);
    }
    setIndex(index + 1);
  };

  useEffect(() => {
    //get ramdom choice
    let a = data.sort(() => Math.random() - 0.5);
    var choices = a.map((x) => x.definition).sort(() => Math.random() - 0.5);

    a = a.map((x, i) => {
      x.choices = choices.filter((y) => y !== x.definition).slice(0, 3);
      x.choices.push(x.definition);
      x.choices = x.choices.sort(() => Math.random() - 0.5);
      return x;
    });

    setList(a);
  }, [data]);

  return (
    <>
      {data.map((item, i) => {
        return index === i && <Choice data={item} key={i} hanleClick={handleClick} id={id} />;
      })}
      {index === list.length && <Result status="success" title={`Kết quả ${score}/${list?.length}`} />}
    </>
  );
};
