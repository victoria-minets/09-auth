// app\(auth routes)\sign-in\page.tsx

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { login, type LoginRequest } from '../../../lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const payload: LoginRequest = { email, password };
      const user = await login(payload);

      // Оновлюємо глобальний стан автентифікації
      setUser(user);

      router.push('/profile'); // редірект після успішного входу
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

// 'use client';

// import { useState, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { login, type LoginRequest } from '../../../lib/api/clientApi';
// import css from './SignInPage.module.css';

// export default function SignInPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const payload: LoginRequest = { email, password };
//       await login(payload);
//       router.push('/profile'); // редірект після успішного логіну
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || 'Login failed');
//       } else {
//         setError('Login failed');
//       }
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <form className={css.form} onSubmit={handleSubmit}>
//         <h1 className={css.formTitle}>Sign in</h1>

//         <div className={css.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             className={css.input}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             className={css.input}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className={css.actions}>
//           <button type="submit" className={css.submitButton}>
//             Log in
//           </button>
//         </div>

//         {error && <p className={css.error}>{error}</p>}
//       </form>
//     </main>
//   );
// }
