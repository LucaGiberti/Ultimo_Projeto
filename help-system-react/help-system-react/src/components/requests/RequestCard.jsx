import { Clock3, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import { formatDateTime } from '../../utils/formatDate';

export default function RequestCard({ request }) {
  const navigate = useNavigate();

  return (
    <div className="request-row-card" onClick={() => navigate(`/requests/${request.id}`)}>
      <div>
        <div className="req-title-line">
          <StatusBadge status={request.status} />
          <h4>{request.titulo}</h4>
        </div>
        <p className="req-desc">{request.descricao}</p>
        <div className="req-meta">
          <span className="meta-item req-user-info">
            <User size={14} /> {request.nome_completo}
          </span>
          <span className="meta-item req-user-info">
            <Clock3 size={14} /> {formatDateTime(request.data_abertura)}
          </span>
        </div>
      </div>
    </div>
  );
}
