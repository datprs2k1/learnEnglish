import { FC } from 'react';
interface ILetterBoxProps {
  letter: string;
  color: string;
}

export const LetterBox: FC<ILetterBoxProps> = ({ letter, color }) => {
  const getColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'border-green-600 bg-green-600 text-white';
      case 'yellow':
        return 'border-yellow-500 bg-yellow-500 text-white';
      default:
        return 'border-gray-500 bg-gray-500 text-white';
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-center h-16 uppercase transition-all transform border-2 text-xl ${getColor(
          color
        )}`}
      >
        {letter}
      </div>
    </>
  );
};
