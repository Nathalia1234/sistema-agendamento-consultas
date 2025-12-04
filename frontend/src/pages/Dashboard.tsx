import { useEffect, useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/services/api';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Consulta {
  id: string;
  paciente: string;
  data: string;
  descricao: string;
  status?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    try {
      const response = await api.get('/consultas');
      setConsultas(response.data);
    } catch (error: any) {
    if (error.response?.status === 401) {
        toast.error("Sessão expirada, faça login novamente");
        navigate("/login");
        return;
    }
    toast.error("Erro ao carregar consultas");
} finally {
      setLoading(false);
    }
  };

  const proximasConsultas = consultas
    .filter((c) => new Date(c.data) >= new Date())
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 3);

  const stats = [
    {
      title: 'Total de Consultas',
      value: consultas.length,
      icon: Calendar,
      color: 'bg-primary',
    },
    {
      title: 'Próximas Consultas',
      value: proximasConsultas.length,
      icon: Clock,
      color: 'bg-accent',
    },
    {
      title: 'Concluídas',
      value: consultas.filter((c) => c.status === 'concluida').length,
      icon: CheckCircle,
      color: 'bg-success-green',
    },
    {
      title: 'Pendentes',
      value: consultas.filter((c) => c.status === 'pendente' || !c.status).length,
      icon: AlertCircle,
      color: 'bg-warning-amber',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do sistema de consultas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-2 hover:shadow-lg transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Próximas Consultas */}
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Próximas Consultas</CardTitle>
            <Button onClick={() => navigate('/consultas')}>
              Ver Todas
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-center py-8">Carregando...</p>
            ) : proximasConsultas.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Nenhuma consulta agendada
                </p>
                <Button onClick={() => navigate('/consultas/nova')}>
                  Agendar Consulta
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {proximasConsultas.map((consulta) => (
                  <div
                    key={consulta.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{consulta.paciente}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(consulta.data), "dd 'de' MMMM 'às' HH:mm", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/consultas/${consulta.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
