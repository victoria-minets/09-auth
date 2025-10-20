import type { ReactNode } from 'react';

export const metadata = {
  title: 'Authentication | NoteHub',
  description: 'Sign in or create a new account to access NoteHub',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
