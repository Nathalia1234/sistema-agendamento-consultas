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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita recarregar a tela ao mudar de aba
      retry: 1, // Tenta conectar apenas mais 1 vez se der erro (melhora UX)
    },
  },
});



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Define application routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Consultas Routes */}
          <Route
            path="/consultas"
            element={
              <ProtectedRoute>
                <Consultas />
              </ProtectedRoute>
            }
          />

            {/* New Consulta Route */}
          <Route
            path="/consultas/nova"
            element={
              <ProtectedRoute>
                <ConsultaForm />
              </ProtectedRoute>
            }
          />

          {/* Edit Consulta Route */}
          <Route
            path="/consultas/editar/:id"
            element={
              <ProtectedRoute>
                <EditarConsulta />
              </ProtectedRoute>
            }
          />

          {/* Perfil Route */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
