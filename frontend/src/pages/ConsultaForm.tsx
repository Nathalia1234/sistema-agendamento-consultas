import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/services/api';
import { toast } from 'sonner';

const ConsultaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    paciente: '',
    data: '',
    descricao: '',
  });

  useEffect(() => {
    if (isEdit) {
      fetchConsulta();
    }
  }, [id]);

  const fetchConsulta = async () => {
    try {
      const response = await api.get(`/consultas/${id}`);
      const consulta = response.data;
      setFormData({
        paciente: consulta.paciente,
        data: new Date(consulta.data).toISOString().slice(0, 16),
        descricao: consulta.descricao,
      });
    } catch (error) {
      toast.error('Erro ao carregar consulta');
      navigate('/consultas');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        data: new Date(formData.data).toISOString(),
      };

      if (isEdit) {
        await api.put(`/consultas/${id}`, data);
        toast.success('Consulta atualizada com sucesso!');
      } else {
        await api.post('/consultas', data);
        toast.success('Consulta criada com sucesso!');
      }

      navigate('/consultas');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao salvar consulta';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/consultas')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEdit ? 'Editar Consulta' : 'Nova Consulta'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Preencha os dados da consulta
            </p>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Informações da Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="paciente">Nome do Paciente *</Label>
                <Input
                  id="paciente"
                  placeholder="Digite o nome do paciente"
                  value={formData.paciente}
                  onChange={(e) =>
                    setFormData({ ...formData, paciente: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data e Hora *</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="data"
                    type="datetime-local"
                    value={formData.data}
                    onChange={(e) =>
                      setFormData({ ...formData, data: e.target.value })
                    }
                    className="pl-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva o motivo da consulta, sintomas, etc."
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  rows={5}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Salvando...
                    </>
                  ) : isEdit ? (
                    'Atualizar Consulta'
                  ) : (
                    'Criar Consulta'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/consultas')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ConsultaForm;
