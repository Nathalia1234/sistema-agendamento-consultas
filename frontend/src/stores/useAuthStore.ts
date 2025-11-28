import { create } from "zustand";
import { api } from "@/services/api";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

interface LoginResponse {
  token: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const res = await api.post<LoginResponse>("/login", { email, password });

      localStorage.setItem("token", res.data.token);

      set({
        token: res.data.token,
        isAuthenticated: true,
      });

      return true;
    } catch (e) {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");

    set({
      token,
      isAuthenticated: !!token
    });
  },
}));
