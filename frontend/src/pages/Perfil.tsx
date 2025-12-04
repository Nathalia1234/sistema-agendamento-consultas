import { useEffect, useState } from 'react';
import { User, Mail, Calendar, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/services/api';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

const Perfil = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

// Pega apenas o user atual da store (sem setUser)
const user = useAuthStore((state) => state.user);


  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/me");

      // Ajuste porque o backend usa "nome"
      const profileData: UserProfile = {
        id: response.data.id,
        name: response.data.nome,
        email: response.data.email,
        createdAt: response.data.createdAt
      };

      setProfile(profileData);

    } catch (error: any) {
      toast.error("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <p className="text-muted-foreground mt-2">
            Suas informações pessoais
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Informações do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile?.name}</h2>
                <p className="text-muted-foreground">{profile?.email}</p>
              </div>
            </div>

            <div className="grid gap-4 pt-6 border-t">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Nome Completo</p>
                  <p className="font-semibold">{profile?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{profile?.email}</p>
                </div>
              </div>

              {profile?.createdAt && (
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Membro desde</p>
                    <p className="font-semibold">
                      {new Date(profile.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Perfil;
