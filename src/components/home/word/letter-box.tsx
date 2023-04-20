import { FC } from 'react';
interface ILetterBoxProps {
  letter: string;
  color: string;
}

export const LetterBox: FC<ILetterBoxProps> = ({ letter, color }) => {
  return (
    <>
      <div className="flex items-center justify-center h-16 uppercase transition-all transform bg-teal-300">
        {letter + color}
      </div>
    </>
  );
};
