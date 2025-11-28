import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/stores/useAuthStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";

import Login from "@/pages/Login";
import Index from "@/pages/Index";
import Consultas from "@/pages/Consultas";
import Pacientes from "@/pages/Pacientes";
import Medicos from "@/pages/Medicos";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((state) => state.token);

  if (!token) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas + Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Index />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultas"
            element={
              <ProtectedRoute>
                <Layout>
                  <Consultas />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/medicos"
            element={
              <ProtectedRoute>
                <Layout>
                  <Medicos />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/pacientes"
            element={
              <ProtectedRoute>
                <Layout>
                  <Pacientes />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
