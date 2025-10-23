// app\(auth routes)\layout.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Викликаємо refresh для оновлення даних та очищення кешу після виходу/входу користувача
    router.refresh();
    setLoading(false);
  }, [router]);

  // Поки дані оновлюються, показуємо лоадер
  return <>{loading ? <div>Loading...</div> : children}</>;
}
// --------------------------------

// import type { ReactNode } from 'react';

// export const metadata = {
//   title: 'Authentication | NoteHub',
//   description: 'Sign in or create a new account to access NoteHub',
// };

// export default function AuthLayout({ children }: { children: ReactNode }) {
//   return <>{children}</>;
// }
