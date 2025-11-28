import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Login() {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const ok = await login(email, password);

    if (ok) {
      toast({ title: "Login realizado!" });
      window.location.href = "/";
    } else {
      toast({ title: "Credenciais inválidas.", variant: "destructive" });
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 shadow-xl rounded-lg w-96 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Acesso</h1>

        <input className="border p-2 rounded w-full"
               placeholder="E-mail"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
        />

        <input className="border p-2 rounded w-full"
               type="password"
               placeholder="Senha"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}
