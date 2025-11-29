import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Calendar,
      title: 'Agendamento Fácil',
      description: 'Agende suas consultas de forma rápida e intuitiva',
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Seus dados estão protegidos com a melhor tecnologia',
    },
    {
      icon: Clock,
      title: 'Gestão de Tempo',
      description: 'Organize seu tempo e nunca perca uma consulta',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">MediCare</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Entrar
            </Button>
            <Button onClick={() => navigate('/registro')}>
              Cadastrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Activity className="w-4 h-4" />
            Sistema de Agendamento Profissional
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Gerencie suas{' '}
            <span className="text-primary">consultas médicas</span>{' '}
            com facilidade
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plataforma completa para agendamento e gestão de consultas médicas.
            Simples, seguro e eficiente.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate('/registro')} className="text-lg h-14 px-8">
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="text-lg h-14 px-8">
              Já tenho conta
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-smooth">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cadastre-se agora e tenha acesso completo ao sistema de agendamento
            </p>
            <Button size="lg" onClick={() => navigate('/registro')} className="text-lg h-14 px-8">
              Criar Conta Grátis
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 MediCare. Sistema de Agendamento de Consultas Médicas.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
