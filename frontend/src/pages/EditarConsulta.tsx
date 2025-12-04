import { useEffect, useState } from "react";
import { getConsultas, updateConsulta } from "@/services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditarConsulta = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataConsulta, setDataConsulta] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getConsultas();
        const consulta = res.data.find((c: any) => c.id === Number(id));

        if (!consulta) return toast.error("Consulta não encontrada");

        setDataConsulta(new Date(consulta.data_consulta).toISOString().slice(0, 16));
        setDescricao(consulta.descricao);
      } catch {
        toast.error("Erro ao carregar consulta");
      }
    };

    load();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateConsulta(Number(id), {
        data_consulta: new Date(dataConsulta).toISOString(),
        descricao: descricao.trim(),
      });

      toast.success("Consulta atualizada!");
      navigate("/consultas");
    } catch {
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
