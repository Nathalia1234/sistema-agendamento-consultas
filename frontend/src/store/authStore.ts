import { create } from 'zustand';
import api from '../services/api';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthState {
  setUser: any;
  isAuthenticated: any;
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  loadStoredAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: null,
  user: null,
  token: null,
  loading: false,
  setUser: (user: User | null) => set({ user }),
  login: async (email: string, senha: string) => {
    set({ loading: true });
    try {
      const response = await api.post('/login', { email, senha });
      set({ isAuthenticated: true, user: response.data.user, token: response.data.token, loading: false });
      return true;
    } catch (error) {
      set({ loading: false });
      return false;
    }
  },
  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
  },
  loadStoredAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ isAuthenticated: true, token, user: JSON.parse(user) });
    }
  },
}));
