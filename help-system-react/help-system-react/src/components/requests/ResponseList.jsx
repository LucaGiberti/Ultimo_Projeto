import EmptyState from '../ui/EmptyState';
import { MessageSquare } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

export default function ResponseList({ responses }) {
  if (!responses.length) {
    return <EmptyState icon={MessageSquare} title="Nenhuma resposta ainda" description="Seja o primeiro a responder esta solicitação." />;
  }

  return (
    <div className="responses-list">
      {responses.map((response) => (
        <div key={response.id} className="response-item">
          <div className="resp-header">
            <strong>{response.userName}</strong>
            <small>{formatDateTime(response.createdAt)}</small>
          </div>
          <p>{response.content}</p>
        </div>
      ))}
    </div>
  );
}
