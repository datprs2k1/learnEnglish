import { FC, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

interface IRouteGuardProps {
  children: ReactNode;
}

export const RouteGuard: FC<IRouteGuardProps> = ({ children }) => {
  const { getUser } = useAuth();
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    if (path != '/login' && path != '/register' && path != '/') {
      if (!getUser()) {
        router.push('/login');
      }
    }
  }, [path, router, getUser]);

  return <>{children}</>;
};
