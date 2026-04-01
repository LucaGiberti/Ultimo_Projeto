import { Send } from 'lucide-react';

export default function ResponseForm({ content, onContentChange, status, onStatusChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="response-form">
      <div className="form-group">
        <label>Sua Resposta</label>
        <textarea
          className="input-field"
          rows="5"
          placeholder="Digite sua resposta aqui..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Atualizar Status</label>
        <select className="input-field" value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="ABERTA">Aberta</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
      </div>
      <button type="submit" className="btn-primary inline-button">
        <Send size={18} /> Enviar Resposta
      </button>
    </form>
  );
}
