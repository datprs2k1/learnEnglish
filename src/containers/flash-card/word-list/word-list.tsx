import { Word } from '@/components/home';
import { Button, Result } from 'antd';
import { FC, useState, useEffect, useRef } from 'react';
interface IWordListProps {
  data: any[];
  id: any;
}

export const WordList: FC<IWordListProps> = ({ data, id }) => {
  const [list, setList] = useState<any[]>([]);
  const [guess, setGuess] = useState<string>('');
  const guessRef = useRef<string>('');

  const current = useRef<number>(0);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    let a = data?.sort(() => Math.random() - 0.5);
    setList(a);
  }, [data]);

  useEffect(() => {
    if (current.current >= list.length) {
      current.current = 0;
    }

    if (guess.length >= list[current.current]?.term.replace(/\(.*\)/gm, '').trim().length) {
      setSubmitted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess]);

  const handleInput = (key: string) => {
    if (key === '{enter}') {
      current.current += 1;
      setGuess('');
      guessRef.current = '';
      setSubmitted(false);
    } else if (key === '{bksp}') {
      guessRef.current = guessRef.current.slice(0, -1);
      setGuess(guessRef.current);
    } else {
      const alphaRegex = /[a-z]/;
      if (alphaRegex.test(key)) {
        guessRef.current += key;
        setGuess(guessRef.current);
      }
    }
  };

  const onCorrect = () => {
    setScore(score + 1);
  };

  useEffect(() => {
    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      let key = e.keyCode == 13 ? '{enter}' : e.keyCode == 8 ? '{bksp}' : String.fromCharCode(e.keyCode).toLowerCase();
      handleInput(key);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {list?.map(
        (word, i) =>
          current.current === i && (
            <Word
              key={i}
              value={guess}
              solution={list[i].term.replace(/\(.*\)/gm, '').trim()}
              data={word}
              submitted={submitted}
              onCorrect={onCorrect}
              id={id}
            />
          )
      )}
      {current.current === list?.length &&
        ((current.current = 0), (<Result status="success" title={`Kết quả ${score}/${list?.length}`} />))}
    </>
  );
};
