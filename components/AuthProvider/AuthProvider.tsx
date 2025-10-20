'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkSession, logout } from '@/lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setIsAuthenticated, clearUser } = useAuthStore();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const currentUser = await checkSession();

        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          clearUser();

          // Якщо користувач не авторизований і знаходиться на приватному маршруті
          if (pathname.startsWith('/profile')) {
            await logout();
            router.push('/sign-in');
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
        clearUser();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [pathname, setUser, setIsAuthenticated, clearUser, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
