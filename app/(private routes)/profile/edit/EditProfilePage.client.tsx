'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getMe, updateMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';
import css from './EditProfilePage.module.css';

const DEFAULT_AVATAR = 'https://ac.goit.global/user/avatar.jpg';

const EditProfilePageClient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Отримуємо користувача
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['me'],
    queryFn: getMe,
  });

  // Мутація для оновлення користувача
  const mutation = useMutation({
    mutationFn: (username: string) => updateMe({ username }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser);
      router.push('/profile'); // редірект на профіль
    },
    onError: () => {
      alert('Failed to update profile.');
    },
  });

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) setUsername(user.username);
  }, [user]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !user) return <p>Could not fetch user data.</p>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(username);
  };

  const handleCancel = () => router.push('/profile');

  return (
    <div className={css.profileCard}>
      <h1 className={css.formTitle}>Edit Profile</h1>

      <Image
        src={user.avatar || DEFAULT_AVATAR}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />

      <form className={css.profileInfo} onSubmit={handleSave}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className={css.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <p>Email: {user.email}</p>

        <div className={css.actions}>
          <button type="submit" className={css.saveButton}>
            Save
          </button>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePageClient;
