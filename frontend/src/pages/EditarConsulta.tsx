import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface Consulta {
  id: number;
  data: string;
  descricao: string;
}

const EditarConsulta = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataConsulta, setDataConsulta] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<Consulta[]>("/consultas");

        const consulta = res.data.find((c) => c.id === Number(id));
        if (!consulta) {
          toast.error("Consulta não encontrada");
          return;
        }

        // Ajusta para o formato aceito pelo datetime-local
        const dataISO = new Date(consulta.data).toISOString().slice(0, 16);

        setDataConsulta(dataISO);
        setDescricao(consulta.descricao);
      } catch (error) {
        toast.error("Erro ao carregar consulta");
      }
    };

    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataISO = new Date(dataConsulta).toISOString();

      await api.put(`/consultas/${id}`, {
        data: dataISO,
        descricao,
      });

      toast.success("Consulta atualizada com sucesso!");
      navigate("/consultas");
    } catch (error) {
      toast.error("Erro ao atualizar consulta");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Editar Consulta</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">

        <div>
          <label className="block mb-1 font-medium">Data e Hora</label>
          <input
            type="datetime-local"
            className="w-full border px-3 py-2 rounded"
            value={dataConsulta}
            onChange={(e) => setDataConsulta(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Salvar Alterações
        </button>

      </form>
    </div>
  );
};

export default EditarConsulta;
