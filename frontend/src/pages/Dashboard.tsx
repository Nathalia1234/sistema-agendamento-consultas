import { useEffect, useState } from 'react';
import { Users, Stethoscope, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import api from '@/services/api';
import { toast } from 'sonner';

interface Stats {
  totalPacientes: number;
  totalMedicos: number;
  totalConsultas: number;
  consultasMes: number;
}

const chartConfig = {
  consultas: {
    label: "Consultas",
  },
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPacientes: 0,
    totalMedicos: 0,
    totalConsultas: 0,
    consultasMes: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [pacientesRes, medicosRes, consultasRes] = await Promise.all([
        api.get('/pacientes'),
        api.get('/medicos'),
        api.get('/consultas'),
      ]);

      const pacientes = pacientesRes.data;
      const medicos = medicosRes.data;
      const consultas = consultasRes.data;

      // Calcular consultas do mês atual
      const currentMonth = new Date().getMonth();
      const consultasMes = consultas.filter((c: any) => {
        const consultaDate = new Date(c.data);
        return consultaDate.getMonth() === currentMonth;
      }).length;

      setStats({
        totalPacientes: pacientes.length,
        totalMedicos: medicos.length,
        totalConsultas: consultas.length,
        consultasMes,
      });

      // Preparar dados para o gráfico (últimos 6 meses)
      const monthsData = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });
        const count = consultas.filter((c: any) => {
          const consultaDate = new Date(c.data);
          return consultaDate.getMonth() === date.getMonth() &&
                 consultaDate.getFullYear() === date.getFullYear();
        }).length;
        
        monthsData.push({
          mes: monthName.charAt(0).toUpperCase() + monthName.slice(1),
          consultas: count,
        });
      }
      
      setChartData(monthsData);
      setLoading(false);
    } catch (error: any) {
      toast.error('Erro ao carregar dados do dashboard');
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total de Pacientes',
      value: stats.totalPacientes,
      icon: Users,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
    {
      title: 'Total de Médicos',
      value: stats.totalMedicos,
      icon: Stethoscope,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      title: 'Total de Consultas',
      value: stats.totalConsultas,
      icon: Calendar,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
    {
      title: 'Consultas Este Mês',
      value: stats.consultasMes,
      icon: TrendingUp,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Visão geral do sistema de agendamento</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Consultas por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="mes"
                  className="text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  className="text-xs"
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="consultas"
                  fill="hsl(var(--chart-1))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
