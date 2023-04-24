import { Word } from '@/components/home';
import { Button } from 'antd';
import { FC, useState, useEffect, useRef } from 'react';
interface IWordListProps {}

export const WordList: FC<IWordListProps> = (props) => {
  const data = ['books', 'window', 'computer'];
  const [guess, setGuess] = useState<string>('');
  const guessRef = useRef<string>('');

  const current = useRef<number>(0);

  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (current.current >= data.length) {
      current.current = 0;
    }

    if (guess.length >= data[current.current].length) {
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
      {data.map(
        (word, i) =>
          current.current === i && <Word key={i} value={guess} solution={word} data={word} submitted={submitted} />
      )}
    </>
  );
};
