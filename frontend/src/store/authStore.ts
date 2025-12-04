import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/api";

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;

  setUser: (user: any | null) => void;
  setToken: (token: string | null) => void;

  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      
      login: async (email, senha) => {
        try {
          const response = await api.post("/auth/login", { email, senha });

          const { token, usuario } = response.data;

          // salva Zustand
          set({
            token,
            user: usuario,
            isAuthenticated: true,
          });

          // salva token no localStorage também
          localStorage.setItem("token", token);

          return true;
        } catch (error) {
          console.error("Erro no login:", error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
