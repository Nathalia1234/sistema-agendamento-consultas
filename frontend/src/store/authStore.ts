import { create } from 'zustand';
import api from '../services/api';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  loadStoredAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,

  loadStoredAuth: () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      set({ token, user: JSON.parse(userData) });
    }
  },

  login: async (email, senha) => {
    try {
      set({ loading: true });

      const response = await api.post('/auth/login', { email, senha });

      const { token, user } = response.data;

      // Salva token e usuario REAL
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ token, user, loading: false });

      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      set({ loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    set({ token: null, user: null });
  },
}));
