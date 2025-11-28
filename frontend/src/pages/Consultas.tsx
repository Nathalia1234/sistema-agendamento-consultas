import { useEffect, useState } from 'react';
import { Plus, Pencil, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
import api from '@/services/api';
import { toast } from 'sonner';

interface Consulta {
  id: string;
  paciente_id: string;
  medico_id: string;
  data: string;
  horario: string;
  status: string;
  observacoes?: string;
}

interface Paciente {
  id: string;
  nome: string;
}

interface Medico {
  id: string;
  nome: string;
  especialidade: string;
}

export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filteredConsultas, setFilteredConsultas] = useState<Consulta[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(null);
  const [formData, setFormData] = useState({
    paciente_id: '',
    medico_id: '',
    data: '',
    horario: '',
    status: 'agendada',
    observacoes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = consultas.filter((c) => {
      const paciente = pacientes.find((p) => p.id === c.paciente_id);
      const medico = medicos.find((m) => m.id === c.medico_id);
      return (
        paciente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico?.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredConsultas(filtered);
  }, [searchTerm, consultas, pacientes, medicos]);

  const fetchData = async () => {
    try {
      const [consultasRes, pacientesRes, medicosRes] = await Promise.all([
        api.get('/consultas'),
        api.get('/pacientes'),
        api.get('/medicos'),
      ]);
      setConsultas(consultasRes.data as Consulta[]);
      setFilteredConsultas(consultasRes.data as Consulta[]);
      setPacientes(pacientesRes.data as Paciente[]);
      setMedicos(medicosRes.data as Medico[]);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar dados');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedConsulta) {
        await api.put(`/consultas/${selectedConsulta.id}`, formData);
        toast.success('Consulta atualizada com sucesso!');
      } else {
        await api.post('/consultas', formData);
        toast.success('Consulta agendada com sucesso!');
      }

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar consulta');
    }
  };

  const handleEdit = (consulta: Consulta) => {
    setSelectedConsulta(consulta);
    setFormData({
      paciente_id: consulta.paciente_id,
      medico_id: consulta.medico_id,
      data: consulta.data,
      horario: consulta.horario,
      status: consulta.status,
      observacoes: consulta.observacoes || '',
    });
    setDialogOpen(true);
  };

  const handleCancel = async () => {
    if (!selectedConsulta) return;
    
    try {
      await api.delete(`/consultas/${selectedConsulta.id}`);
      toast.success('Consulta cancelada com sucesso!');
      setCancelDialogOpen(false);
      setSelectedConsulta(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao cancelar consulta');
    }
  };

  const resetForm = () => {
    setFormData({
      paciente_id: '',
      medico_id: '',
      data: '',
      horario: '',
      status: 'agendada',
      observacoes: '',
    });
    setSelectedConsulta(null);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      agendada: { variant: 'default', label: 'Agendada' },
      confirmada: { variant: 'secondary', label: 'Confirmada' },
      concluida: { variant: 'outline', label: 'Concluída' },
      cancelada: { variant: 'destructive', label: 'Cancelada' },
    };
    const config = variants[status] || variants.agendada;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const getPacienteNome = (id: string) => {
    return pacientes.find((p) => p.id === id)?.nome || 'Desconhecido';
  };

  const getMedicoInfo = (id: string) => {
    const medico = medicos.find((m) => m.id === id);
    return medico ? `${medico.nome} - ${medico.especialidade}` : 'Desconhecido';
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Consultas</h1>
          <p className="mt-1 text-muted-foreground">Gerencie as consultas médicas</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedConsulta ? 'Editar Consulta' : 'Nova Consulta'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados da consulta
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paciente">Paciente</Label>
                <Select
                  value={formData.paciente_id}
                  onValueChange={(value) => setFormData({ ...formData, paciente_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {pacientes.map((paciente) => (
                      <SelectItem key={paciente.id} value={paciente.id}>
                        {paciente.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medico">Médico</Label>
                <Select
                  value={formData.medico_id}
                  onValueChange={(value) => setFormData({ ...formData, medico_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o médico" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicos.map((medico) => (
                      <SelectItem key={medico.id} value={medico.id}>
                        {medico.nome} - {medico.especialidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horario">Horário</Label>
                  <Input
                    id="horario"
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agendada">Agendada</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Input
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Observações adicionais"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar consultas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsultas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhuma consulta encontrada
                </TableCell>
              </TableRow>
            ) : (
              filteredConsultas.map((consulta) => (
                <TableRow key={consulta.id}>
                  <TableCell className="font-medium">{getPacienteNome(consulta.paciente_id)}</TableCell>
                  <TableCell>{getMedicoInfo(consulta.medico_id)}</TableCell>
                  <TableCell>{new Date(consulta.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{consulta.horario}</TableCell>
                  <TableCell>{getStatusBadge(consulta.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(consulta)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedConsulta(consulta);
                          setCancelDialogOpen(true);
                        }}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Consulta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar esta consulta?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedConsulta(null)}>
              Voltar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Cancelar Consulta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
