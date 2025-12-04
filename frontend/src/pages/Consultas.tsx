import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define a interface para uma consulta
interface Consulta {
  id: number;
  data_consulta: string;
  descricao: string;
}

// Componente principal para listar consultas
const Consultas = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const navigate = useNavigate();

  // Carrega todas as consultas do usuário logado
  const loadConsultas = async () => {
    try {
      const res = await api.get("/consultas");
      setConsultas(res.data);
    } catch (error) {
      toast.error("Erro ao carregar consultas");
    }
  };

  useEffect(() => {
    loadConsultas();
  }, []);

  // Excluir consulta
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Deseja realmente excluir esta consulta?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/consultas/${id}`);
      toast.success("Consulta excluída");

      // remove da lista sem recarregar tudo
      setConsultas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      toast.error("Erro ao excluir consulta");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Consultas</h1>

      {/* Linha superior com botões separados esquerda/direita */}
      <div className="flex mb-4 justify-between items-center">
        
        {/* Esquerda */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        onClick={() => navigate("/consultas/nova")}
      >
        Nova Consulta
      </button>

        {/* Direita */}
        <button
    onClick={() => navigate("/dashboard")}
    className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
  >
    Voltar
        </button>
        
      </div>

      <div className="bg-white shadow rounded p-4">
        {consultas.length === 0 ? (
          <p>Nenhuma consulta cadastrada.</p>
        ) : (
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Data e Hora</th>
                <th className="py-2">Descrição</th>
                <th className="py-2">Ações</th>
              </tr>
            </thead>

            <tbody>
              {consultas.map((consulta) => (
                <tr key={consulta.id} className="border-b">
                  <td>{new Date(consulta.data_consulta).toLocaleString()}</td>
                  <td>{consulta.descricao}</td>

                  <td className="space-x-2">
                    {/* Botão EDITAR */}
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                      onClick={() =>
                        navigate(`/consultas/editar/${consulta.id}`)
                      }
                    >
                      Editar
                    </button>

                    {/* Botão EXCLUIR */}
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleDelete(consulta.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
};

export default Consultas;
