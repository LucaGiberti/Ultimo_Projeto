import { Clock3, User } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { formatDateTime } from '../../utils/formatDate';

export default function RequestDetails({ request }) {
  return (
    <>
      <div className="request-header">
        <div className="flex items-center justify-between gap-4 wrap-mobile">
          <h2 id="req-title" className="text-2xl font-bold mb-4">{request.titulo}</h2>
          <StatusBadge status={request.status} />
        </div>
        <div className="meta-info wrap-mobile">
          <span className="meta-item"><User size={14} /> {request.nome_completo}</span>
          <span className="meta-item"><Clock3 size={14} /> {formatDateTime(request.createdAt || request.data_abertura)}</span>
          <span className="badge-category">{request.categoria}</span>
        </div>
      </div>
      <div className="description-box">
        <p>{request.descricao}</p>
      </div>
    </>
  );
}
