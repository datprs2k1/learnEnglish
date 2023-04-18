import { FC, ReactNode } from 'react';
interface IEmptyLayoutProps {
  children: ReactNode;
}

export const EmptyLayout: FC<IEmptyLayoutProps> = ({ children }) => {
  return <>{children}</>;
};
