import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Configuracoes() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="mt-1 text-muted-foreground">Gerencie as preferências do sistema</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil do Usuário</CardTitle>
            <CardDescription>Informações da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Nome</Label>
              <p className="mt-1 text-sm text-muted-foreground">{user?.nome}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">E-mail</Label>
              <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>Personalize a aparência do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-toggle" className="text-base">Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar ou desativar o tema escuro
                </p>
              </div>
              <Switch
                id="theme-toggle"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sobre o Sistema</CardTitle>
            <CardDescription>Informações do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Label className="text-sm font-medium">Nome</Label>
              <p className="mt-1 text-sm text-muted-foreground">Sistema de Agendamento de Consultas</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Versão</Label>
              <p className="mt-1 text-sm text-muted-foreground">1.0.0</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Descrição</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                Sistema completo para gestão de consultas médicas, pacientes e médicos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
