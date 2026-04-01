import { AlertCircle, CheckCircle2, Clock3, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../ui/EmptyState';
import StatusBadge from '../ui/StatusBadge';
import { formatDateTime } from '../../utils/formatDate';

function StatusIcon({ status }) {
  if (status === 'ABERTA') return <Clock3 size={16} className="text-yellow" />;
  if (status === 'EM_ANDAMENTO') return <AlertCircle size={16} className="text-blue" />;
  if (status === 'CONCLUIDA') return <CheckCircle2 size={16} className="text-green" />;
  return null;
}

export default function RequestTable({ requests }) {
  const navigate = useNavigate();

  if (!requests.length) {
    return <EmptyState icon={Search} title="Nenhuma solicitação encontrada" description="Tente ajustar os filtros ou criar uma nova solicitação." />;
  }

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>Colaborador</th>
            <th>Departamento</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="table-clickable-row" onClick={() => navigate(`/requests/${request.id}`)}>
              <td>
                <div className="flex items-center gap-2">
                  <StatusIcon status={request.status} />
                  <StatusBadge status={request.status} />
                </div>
              </td>
              <td>
                <div className="max-w-md">
                  <p className="font-medium truncate">{request.titulo}</p>
                  <p className="text-sm text-muted truncate">{request.descricao}</p>
                </div>
              </td>
              <td><span className="badge-category">{request.categoria}</span></td>
              <td>{request.nome_completo}</td>
              <td>{request.departamento}</td>
              <td>{formatDateTime(request.data_abertura)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
