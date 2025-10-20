// lib/store/authStore.ts

import { create } from 'zustand';
import { getMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  clearUser: () => set({ user: null, isAuthenticated: false }),

  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  logout: () => set({ user: null, isAuthenticated: false }),

  checkAuth: async () => {
    // якщо вже є користувач — не перевіряй повторно
    if (get().user) {
      set({ isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const user = await getMe();
      set({ user, isAuthenticated: !!user, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

// ---------------------------------------------------
// import { create } from 'zustand';
// import { checkSession, logout as logoutApi } from '@/lib/api/clientApi';
// import type { User } from '@/types/user';

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   setUser: (user: User | null) => void;
//   clearUser: () => void;
//   setIsAuthenticated: (value: boolean) => void;
//   checkAuth: () => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>()((set) => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,

//   setUser: (user) =>
//     set({
//       user,
//       isAuthenticated: !!user,
//       isLoading: false,
//     }),

//   clearUser: () =>
//     set({
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,
//     }),

//   setIsAuthenticated: (value) => set({ isAuthenticated: value }),

//   checkAuth: async () => {
//     set({ isLoading: true });
//     try {
//       const currentUser = await checkSession();
//       if (currentUser) {
//         set({
//           user: currentUser,
//           isAuthenticated: true,
//           isLoading: false,
//         });
//       } else {
//         set({
//           user: null,
//           isAuthenticated: false,
//           isLoading: false,
//         });
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       set({
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//       });
//     }
//   },

//   logout: async () => {
//     try {
//       await logoutApi();
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       set({ user: null, isAuthenticated: false, isLoading: false });
//     }
//   },
// }));
