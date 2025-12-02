import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Edit, Trash2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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

const Consultas = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    try {
      const response = await api.get('/consultas');
      setConsultas(response.data);
    } catch (error) {
      toast.error('Erro ao carregar consultas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await api.delete(`/consultas/${deleteId}`);
      toast.success('Consulta excluída com sucesso!');
      fetchConsultas();
    } catch (error) {
      toast.error('Erro ao excluir consulta');
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancel = async () => {
    if (!cancelId) return;

    try {
      await api.put(`/consultas/cancel/${cancelId}`);
      toast.success('Consulta cancelada com sucesso!');
      fetchConsultas();
    } catch (error) {
      toast.error('Erro ao cancelar consulta');
    } finally {
      setCancelId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Consultas</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie todas as suas consultas
            </p>
          </div>
          <Button onClick={() => navigate('/consultas/nova')} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Nova Consulta
          </Button>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Lista de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : consultas.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Nenhuma consulta cadastrada
                </p>
                <Button onClick={() => navigate('/consultas/nova')}>
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Primeira Consulta
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Data e Hora</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultas.map((consulta) => (
                    <TableRow key={consulta.id}>
                      <TableCell className="font-medium">{consulta.paciente}</TableCell>
                      <TableCell>
                        {format(new Date(consulta.data), "dd/MM/yyyy 'às' HH:mm", {
                          locale: ptBR,
                        })}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {consulta.descricao}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            consulta.status === 'cancelada'
                              ? 'bg-destructive/10 text-destructive'
                              : consulta.status === 'concluida'
                              ? 'bg-success-green/10 text-success-green'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {consulta.status || 'Pendente'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/consultas/editar/${consulta.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCancelId(consulta.id)}
                            disabled={consulta.status === 'cancelada'}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteId(consulta.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta consulta? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Dialog */}
      <AlertDialog open={!!cancelId} onOpenChange={() => setCancelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Consulta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar esta consulta?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel}>
              Confirmar Cancelamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Consultas;
