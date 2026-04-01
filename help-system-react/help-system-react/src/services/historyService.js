import { storageService } from './storageService';
import { requestService } from './requestService';

export const historyService = {
  getActivitiesForUser(user) {
    if (!user) return [];

    const requests = requestService
      .getAllRequests()
      .filter((request) => request.userId == user.id || request.email === user.email);

    const responses = requests.flatMap((request) =>
      requestService.getResponsesByRequestId(request.id).map((response) => ({ request, response }))
    );

    const generatedActivities = [
      ...requests.map((request) => ({
        id: `request-${request.id}`,
        type: 'request_created',
        title: 'Solicitação Criada',
        description: `Você criou a solicitação "${request.titulo}".`,
        timestamp: request.data_abertura,
        requestId: request.id,
      })),
      ...requests
        .filter((request) => request.status !== 'ABERTA')
        .map((request) => ({
          id: `status-${request.id}`,
          type: 'status_changed',
          title: 'Status Atualizado',
          description: `A solicitação "${request.titulo}" foi atualizada para "${request.status}".`,
          timestamp: request.createdAt ?? request.data_abertura,
          requestId: request.id,
        })),
      ...responses.map(({ request, response }) => ({
        id: `response-${response.id}`,
        type: 'response_given',
        title: 'Nova Resposta',
        description: `A solicitação "${request.titulo}" recebeu uma nova resposta de ${response.userName}.`,
        timestamp: response.createdAt,
        requestId: request.id,
      })),
    ];

    const logActivities = storageService.getActivitiesByUser(user.id).map((activity) => ({
      id: `log-${activity.id}`,
      type: 'history_log',
      title: activity.type,
      description: activity.description,
      timestamp: activity.timestamp,
      requestId: activity.requestId,
    }));

    return [...generatedActivities, ...logActivities].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },
};
