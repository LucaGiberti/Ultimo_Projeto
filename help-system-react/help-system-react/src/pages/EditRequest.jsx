import { Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from '../components/layout/MainHeader';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { requestService } from '../services/requestService';
import { REQUEST_CATEGORIES } from '../utils/constants';

export default function EditRequest() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', category: '', description: '', status: 'ABERTA' });
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const foundRequest = requestService.getRequestById(id);

    if (!foundRequest) {
      window.alert('Solicitação não encontrada');
      navigate('/dashboard');
      return;
    }

    if (foundRequest.userId !== user.id) {
      window.alert('Você não tem permissão para editar esta solicitação');
      navigate('/dashboard');
      return;
    }

    setRequest(foundRequest);
    setForm({
      title: foundRequest.titulo,
      category: foundRequest.categoria,
      description: foundRequest.descricao,
      status: foundRequest.status,
    });
  }, [id, navigate, user.id]);

  if (!request) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.category || !form.description) {
      window.alert('Preencha todos os campos obrigatórios');
      return;
    }

    requestService.updateRequest(request.id, {
      titulo: form.title,
      categoria: form.category,
      descricao: form.description,
      status: form.status,
    });

    window.alert('Solicitação atualizada com sucesso!');
    navigate(`/requests/${request.id}`);
  };

  const handleDelete = () => {
    if (!window.confirm('Tem certeza que deseja excluir esta solicitação?')) return;
    requestService.deleteRequest(request.id);
    window.alert('Solicitação excluída com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="bg-gradient min-page">
      <MainHeader title="Editar Solicitação" subtitle="Atualize as informações da sua solicitação" backTo={`/requests/${request.id}`} />

      <main className="content-container">
        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label>Título <span className="text-red-500">*</span></label>
              <input className="input-field" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
            </div>

            <div className="form-group">
              <label>Categoria <span className="text-red-500">*</span></label>
              <select className="input-field" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}>
                <option value="">Selecione uma categoria</option>
                {REQUEST_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select className="input-field" value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}>
                <option value="ABERTA">Aberta</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="CONCLUIDA">Concluída</option>
              </select>
            </div>

            <div className="form-group">
              <label>Descrição Detalhada <span className="text-red-500">*</span></label>
              <textarea className="input-field" rows="8" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
            </div>

            <div className="flex gap-4 pt-4 wrap-mobile">
              <button type="button" onClick={() => navigate(`/requests/${request.id}`)} className="btn-outline flex-1">Cancelar</button>
              <button type="button" onClick={handleDelete} className="btn-danger-outline flex-1 inline-button centered-button"><Trash2 size={18} /> Excluir</button>
              <button type="submit" className="btn-primary flex-1 inline-button centered-button"><Save size={18} /> Salvar Alterações</button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
