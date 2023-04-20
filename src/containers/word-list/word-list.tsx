import { Word } from '@/components/home';
import { FC, useState, useEffect, useRef } from 'react';
interface IWordListProps {}

export const WordList: FC<IWordListProps> = (props) => {
  const [solution, setSolution] = useState<string>('books');
  const [guess, setGuess] = useState<string>('');
  const guessRef = useRef<string>('');

  const handleInput = (key: string) => {
    if (key === '{enter}') {
      guessRef.current = '';
      setGuess(guessRef.current);
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
      <Word solution={solution} data="book" submitted={guess.length >= solution.length} value={guess} />;
    </>
  );
};
