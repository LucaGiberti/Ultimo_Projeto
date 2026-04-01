import { MessageSquarePlus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import RequestCard from '../components/requests/RequestCard';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { useRequests } from '../hooks/useRequests';

export default function Dashboard() {
  const { user } = useAuth();
  const { requests } = useRequests();

  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.data_abertura).getTime() - new Date(a.data_abertura).getTime())
    .slice(0, 5);

  return (
    <div className="bg-gradient min-page">
      <AppHeader />

      <main className="dashboard-container max-w-7xl">
        <Card className="welcome-card p-8">
          <h2 className="text-3xl font-bold">Bem-vindo, {user?.nome_completo?.split(' ')[0]}!</h2>
          <p className="text-muted">O que você gostaria de fazer hoje?</p>

          <div className="action-grid">
            <Link to="/create-request" className="btn-action primary">
              <Plus size={24} />
              <div>
                <strong>Nova Solicitação</strong>
                <span>Criar uma nova pergunta</span>
              </div>
            </Link>
            <Link to="/requests" className="btn-action secondary">
              <MessageSquarePlus size={24} />
              <div>
                <strong>Responder</strong>
                <span>Responder solicitações</span>
              </div>
            </Link>
          </div>
        </Card>

        <Card className="recent-requests p-8">
          <div className="section-header">
            <h3>Solicitações Recentes</h3>
            <Link to="/requests" className="btn-text">Ver todas →</Link>
          </div>

          <div className="requests-stack">
            {recentRequests.length ? recentRequests.map((request) => <RequestCard key={request.id} request={request} />) : (
              <p className="text-muted">Nenhuma solicitação cadastrada ainda.</p>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
