import { create } from "zustand";
import { api } from "../services/api";

interface User {
    id: number;
    nome: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;

    login: (email: string, senha: string) => Promise<boolean>;
    register: (nome: string, email: string, senha: string) => Promise<boolean>;
    logout: () => void;
    loadUserFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    // ============================================================
    // LOGIN
    // ============================================================
    login: async (email, senha) => {
        set({ loading: true, error: null });

        try {
            const response = await api.post("/auth/login", { email, senha });

            // backend deve retornar "token" e "user"
            const { token, user } = response.data;

            if (!token || !user) {
                set({ loading: false, error: "Resposta inválida do servidor" });
                return false;
            }

            // salva token
            localStorage.setItem("token", token);

            // salva user no Zustand
            set({ user, loading: false });

            return true;
        } catch (error: any) {
            set({
                loading: false,
                error: error.response?.data?.message || "Erro ao fazer login.",
            });
            return false;
        }
    },

    // ============================================================
    // REGISTER
    // ============================================================
    register: async (nome, email, senha) => {
        set({ loading: true, error: null });

        try {
            const response = await api.post("/auth/register", {
                nome,
                email,
                senha,
            });

            return !!response.data;
        } catch (error: any) {
            set({
                loading: false,
                error: error.response?.data?.message || "Erro ao cadastrar usuário.",
            });
            return false;
        }
    },

    // ============================================================
    // LOGOUT
    // ============================================================
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
    },

    // ============================================================
    // CARREGA USUÁRIO DO LOCALSTORAGE NA INICIALIZAÇÃO
    // ============================================================
    loadUserFromStorage: () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // força axios a enviar o token
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // opcional: buscar dados do usuário logado
        // se quiser validar expirado → GET /auth/me
        // aqui assumimos que o token ainda é válido
        try {
            const userJson = localStorage.getItem("user_info");
            if (userJson) {
                const user = JSON.parse(userJson);
                set({ user });
            }
        } catch (e) {
            console.error("Erro ao recuperar usuário salvo.");
        }
    },
}));
