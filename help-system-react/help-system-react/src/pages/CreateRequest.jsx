import { Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../components/layout/MainHeader';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { requestService } from '../services/requestService';
import { REQUEST_CATEGORIES } from '../utils/constants';

export default function CreateRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', category: '', description: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.category || !form.description) {
      window.alert('Preencha todos os campos obrigatórios');
      return;
    }

    requestService.createRequest({
      titulo: form.title,
      categoria: form.category,
      descricao: form.description,
      userId: user.id,
      nome_completo: user.nome_completo,
      departamento: user.departamento,
      email: user.email,
    });

    window.alert('Solicitação criada com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="bg-gradient min-page">
      <MainHeader title="Nova Solicitação" subtitle="Descreva sua dúvida ou problema" backTo="/dashboard" />

      <main className="content-container">
        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label>Título <span className="text-red-500">*</span></label>
              <input className="input-field" type="text" placeholder="Resuma sua solicitação em poucas palavras" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
            </div>

            <div className="form-group">
              <label>Categoria <span className="text-red-500">*</span></label>
              <select className="input-field" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} required>
                <option value="">Selecione uma categoria</option>
                {REQUEST_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Descrição Detalhada <span className="text-red-500">*</span></label>
              <textarea className="input-field" rows="8" placeholder="Descreva em detalhes sua dúvida ou problema..." value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} required />
              <p className="mt-2 text-sm text-muted">Quanto mais detalhes você fornecer, mais fácil será para a equipe ajudá-lo.</p>
            </div>

            <div className="requester-info bg-gray-50 p-4 rounded-lg border-gray-200">
              <h3 className="font-bold text-sm mb-3 text-gray-700">Informações do Solicitante</h3>
              <div className="grid grid-cols-2 gap-4 responsive-two-cols">
                <div>
                  <p className="text-xs text-muted">Nome</p>
                  <p className="font-medium text-sm">{user?.nome_completo}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Departamento</p>
                  <p className="font-medium text-sm">{user?.departamento}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 wrap-mobile">
              <button type="button" onClick={() => navigate('/dashboard')} className="btn-outline flex-1">Cancelar</button>
              <button type="submit" className="btn-primary flex-1 inline-button centered-button">
                <Send size={18} /> Enviar Solicitação
              </button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
