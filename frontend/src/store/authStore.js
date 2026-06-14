import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isLoading: true,
    setUser: (newUser) => set({ user: newUser, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
    logout: () => set({ user: null })
}));

export default useAuthStore;