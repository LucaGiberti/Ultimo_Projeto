import { useMemo, useState } from 'react';
import MainHeader from '../components/layout/MainHeader';
import ActivityTimeline from '../components/history/ActivityTimeline';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from '../hooks/useHistory';

export default function History() {
  const { user } = useAuth();
  const { activities } = useHistory(user);
  const [filter, setFilter] = useState('all');

  const filteredActivities = useMemo(() => {
    if (filter === 'requests') {
      return activities.filter((activity) => activity.type === 'request_created' || activity.type === 'status_changed');
    }
    if (filter === 'responses') {
      return activities.filter((activity) => activity.type === 'response_given');
    }
    return activities;
  }, [activities, filter]);

  return (
    <div className="bg-gradient min-page">
      <MainHeader title="Histórico de Atividades" subtitle={`${filteredActivities.length} atividade(s) registrada(s)`} backTo="/dashboard" />

      <main className="content-container">
        <div className="filter-tabs">
          <button type="button" onClick={() => setFilter('all')} className={`tab-btn ${filter === 'all' ? 'active' : ''}`}>Todas</button>
          <button type="button" onClick={() => setFilter('requests')} className={`tab-btn ${filter === 'requests' ? 'active' : ''}`}>Solicitações</button>
          <button type="button" onClick={() => setFilter('responses')} className={`tab-btn ${filter === 'responses' ? 'active' : ''}`}>Respostas</button>
        </div>

        <ActivityTimeline activities={filteredActivities} />
      </main>
    </div>
  );
}
