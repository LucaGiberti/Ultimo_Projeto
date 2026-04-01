import { CheckCircle2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainHeader from '../components/layout/MainHeader';
import RequestDetails from '../components/requests/RequestDetails';
import ResponseForm from '../components/requests/ResponseForm';
import ResponseList from '../components/requests/ResponseList';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { requestService } from '../services/requestService';

export default function AnswerRequest() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [responses, setResponses] = useState([]);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('ABERTA');

  useEffect(() => {
    const foundRequest = requestService.getRequestById(id);
    if (!foundRequest) {
      window.alert('Solicitação não encontrada');
      navigate('/requests');
      return;
    }

    setRequest(foundRequest);
    setResponses(requestService.getResponsesByRequestId(id));
    setStatus(foundRequest.status);
  }, [id, navigate]);

  if (!request) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!content.trim()) {
      window.alert('Digite uma resposta');
      return;
    }

    requestService.saveResponse({
      requestId: request.id,
      content,
      userId: user.id,
      userName: user.nome_completo,
    });

    requestService.updateRequest(request.id, { status });

    setContent('');
    const refreshedRequest = requestService.getRequestById(id);
    setRequest(refreshedRequest);
    setResponses(requestService.getResponsesByRequestId(id));
    window.alert('Resposta enviada com sucesso!');
  };

  const handleResolve = () => {
    if (!window.confirm('Deseja marcar esta solicitação como concluída?')) return;
    requestService.updateRequest(request.id, { status: 'CONCLUIDA' });
    const refreshedRequest = requestService.getRequestById(id);
    setRequest(refreshedRequest);
    setStatus('CONCLUIDA');
  };

  return (
    <div className="bg-gradient min-page">
      <MainHeader title="Detalhes da Solicitação" subtitle="Visualizar e responder" backTo="/requests" />

      <main className="content-container detail-layout">
        <div className="main-column">
          <Card className="p-8 mb-6">
            <div className="flex justify-between align-start gap-4 wrap-mobile">
              <RequestDetails request={request} />
            </div>
          </Card>

          <Card className="p-8 mb-6">
            <h3 className="section-title">Respostas ({responses.length})</h3>
            <ResponseList responses={responses} />
          </Card>

          <Card className="p-8">
            <h3 className="section-title">Adicionar Resposta</h3>
            <ResponseForm content={content} onContentChange={setContent} status={status} onStatusChange={setStatus} onSubmit={handleSubmit} />
          </Card>
        </div>

        <aside className="side-column">
          <Card className="p-6 mb-6">
            <h3>Ações Rápidas</h3>
            <div className="actions-stack">
              <button type="button" onClick={handleResolve} className="btn-success inline-button centered-button"><CheckCircle2 size={18} /> Resolvido</button>
              {request.userId === user.id && <Link to={`/requests/${request.id}/edit`} className="btn-outline inline-button centered-button"><Pencil size={18} /> Editar</Link>}
              <Link to="/requests" className="btn-outline inline-button centered-button">Ver Todas</Link>
            </div>
          </Card>

          <Card className="p-6 info-sidebar">
            <h3>Informações</h3>
            <div className="info-list">
              <div className="info-row"><label>Categoria:</label> <span>{request.categoria}</span></div>
              <div className="info-row"><label>Departamento:</label> <span>{request.departamento}</span></div>
              <div className="info-row"><label>Protocolo:</label> <span>{request.protocolo}</span></div>
            </div>
          </Card>
        </aside>
      </main>
    </div>
  );
}
