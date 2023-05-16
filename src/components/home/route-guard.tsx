import { FC, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

interface IRouteGuardProps {
  children: ReactNode;
  role?: string;
}

export const RouteGuard: FC<IRouteGuardProps> = ({ children, role }) => {
  const { getUser } = useAuth();
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    if (path != '/login' && path != '/register' && path != '/') {
      if (!getUser()) {
        router.push('/login');
      } else if (role && getUser().role != role) {
        router.push('/');
      }
    }
  }, [path, router, getUser, role]);

  return <>{children}</>;
};
