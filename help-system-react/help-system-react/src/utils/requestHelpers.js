import { STATUS_LABELS } from './constants';

export function normalizeRequest(request = {}) {
  return {
    ...request,
    descricao: request.descricao ?? request.description ?? '',
    nome_completo: request.nome_completo ?? request.userName ?? request.name ?? 'Usuário',
    departamento: request.departamento ?? request.userDepartment ?? request.department ?? 'N/A',
    createdAt: request.createdAt ?? request.data_abertura,
  };
}

export function getStatusText(status) {
  return STATUS_LABELS[status] ?? status;
}

export function buildProtocol() {
  return `SOL-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}-${Math.floor(Math.random() * 999)}`;
}
