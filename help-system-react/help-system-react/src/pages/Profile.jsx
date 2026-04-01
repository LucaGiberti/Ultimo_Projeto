import { Link } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileSummary from '../components/profile/ProfileSummary';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { requestService } from '../services/requestService';

function calculateUserStats(userId) {
  const requests = requestService.getAllRequests().filter((request) => request.userId == userId);
  const responses = requests.flatMap((request) => requestService.getResponsesByRequestId(request.id));

  return {
    total: requests.length,
    pending: requests.filter((request) => request.status === 'ABERTA').length,
    inProgress: requests.filter((request) => request.status === 'EM_ANDAMENTO').length,
    resolved: requests.filter((request) => request.status === 'CONCLUIDA').length,
    responses: responses.length,
  };
}

export default function Profile() {
  const { user } = useAuth();
  const stats = calculateUserStats(user.id);

  return (
    <div className="bg-gradient min-page">
      <AppHeader />

      <main className="content-container profile-layout">
        <aside className="profile-sidebar">
          <ProfileSummary user={user} />
        </aside>

        <div className="profile-main-content">
          <ProfileStats stats={stats} />
          <Card className="p-8">
            <h3 className="section-title">Ações Rápidas</h3>
            <div className="action-grid no-top-margin">
              <Link to="/create-request" className="btn-action primary"><strong>Nova Solicitação</strong></Link>
              <Link to="/history" className="btn-action tertiary"><strong>Histórico</strong></Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
