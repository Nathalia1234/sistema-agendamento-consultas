import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Consultas from "./pages/Consultas";
import ConsultaForm from "./pages/ConsultaForm";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import { Edit } from "lucide-react";
import EditarConsulta from "./pages/EditarConsulta";

const queryClient = new QueryClient();



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Define aplicação de rotas */}
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Rotas Protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Rota de Consultas */}
          <Route
            path="/consultas"
            element={
              <ProtectedRoute>
                <Consultas />
              </ProtectedRoute>
            }
          />

            {/* Rota para criação de consulta */}
          <Route
            path="/consultas/nova"
            element={
              <ProtectedRoute>
                <ConsultaForm />
              </ProtectedRoute>
            }
          />

          {/* Rota para edição de consulta */}
          <Route
            path="/consultas/editar/:id"
            element={
              <ProtectedRoute>
                <EditarConsulta />
              </ProtectedRoute>
            }
          />

          {/* Rota para o perfil */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          
          {/* Rota para página não encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
