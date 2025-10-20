'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';
import css from './ProfilePage.module.css';

const ProfileClient = () => {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['me'],
    queryFn: getMe,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !user) return <p>Could not fetch user data.</p>;

  const handleEdit = () => {
    router.push('/profile/edit');
  };

  return (
    <div className={css.profileCard}>
      <div className={css.header}>
        <h1 className={css.formTitle}>Profile Page</h1>
        <button
          className={css.editProfileButton}
          onClick={handleEdit}
          type="button"
        >
          Edit Profile
        </button>
      </div>

      <div className={css.avatarWrapper}>
        <Image
          src={user.avatar || 'https://ac.goit.global/user/avatar.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>

      <div className={css.profileInfo}>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfileClient;
