import { REQUEST_CATEGORIES } from '../utils/constants';
import { buildProtocol, normalizeRequest } from '../utils/requestHelpers';

const KEYS = {
  users: 'help_system_users',
  requests: 'help_system_requests',
  activities: 'help_system_activities',
  notifications: 'help_system_notifications',
  responses: 'help_system_responses',
};

class HelpDeskStorage {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    Object.values(KEYS).forEach((key) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });
  }

  read(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  }

  write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  saveUser(user) {
    const users = this.read(KEYS.users);
    const exists = users.find((item) => item.email.toLowerCase() === user.email.toLowerCase());

    if (exists) {
      return { success: false, msg: 'E-mail já cadastrado' };
    }

    const newUser = {
      id: Date.now(),
      nome_completo: user.nome_completo,
      email: user.email,
      senha: user.senha,
      departamento: user.departamento,
    };

    users.push(newUser);
    this.write(KEYS.users, users);
    this.logActivity('Cadastro', `Usuário ${newUser.nome_completo} registrado`, newUser.id);

    return { success: true, user: newUser };
  }

  getUsers() {
    return this.read(KEYS.users);
  }

  getUserByEmail(email) {
    return this.getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
  }

  updateUser(userId, updates) {
    const users = this.read(KEYS.users);
    const index = users.findIndex((user) => user.id == userId);

    if (index === -1) return null;

    if (updates.email) {
      const duplicate = users.find(
        (user) => user.id != userId && user.email.toLowerCase() === updates.email.toLowerCase()
      );

      if (duplicate) {
        return { error: 'E-mail já cadastrado' };
      }
    }

    users[index] = { ...users[index], ...updates };
    this.write(KEYS.users, users);
    this.logActivity('Perfil', `Dados do usuário ${users[index].nome_completo} atualizados`, userId);
    return users[index];
  }

  changePassword(userId, currentPass, newPass) {
    const users = this.read(KEYS.users);
    const index = users.findIndex((user) => user.id == userId);

    if (index === -1 || users[index].senha !== currentPass) {
      return false;
    }

    users[index].senha = newPass;
    this.write(KEYS.users, users);
    this.logActivity('Segurança', 'Senha alterada com sucesso', userId);
    return true;
  }

  deleteUserAccount(userId) {
    const users = this.read(KEYS.users).filter((user) => user.id != userId);
    const requests = this.read(KEYS.requests).filter((request) => request.userId != userId);
    const notifications = this.read(KEYS.notifications).filter((notification) => notification.userId != userId);
    const responses = this.read(KEYS.responses).filter((response) => response.userId != userId);
    const activities = this.read(KEYS.activities).filter((activity) => activity.userId != userId);

    this.write(KEYS.users, users);
    this.write(KEYS.requests, requests);
    this.write(KEYS.notifications, notifications);
    this.write(KEYS.responses, responses);
    this.write(KEYS.activities, activities);
  }

  saveRequest(request) {
    const requests = this.read(KEYS.requests);
    const now = new Date().toISOString();

    const newRequest = normalizeRequest({
      id: Date.now(),
      protocolo: buildProtocol(),
      status: 'ABERTA',
      data_abertura: now,
      createdAt: now,
      ...request,
      descricao: request.descricao ?? request.description ?? '',
    });

    requests.push(newRequest);
    this.write(KEYS.requests, requests);
    this.logActivity('Solicitação', `Nova solicitação: ${newRequest.titulo}`, newRequest.userId, newRequest.id);

    this.saveNotification({
      userId: newRequest.userId,
      type: 'request_created',
      title: 'Solicitação criada',
      message: `Sua solicitação "${newRequest.titulo}" foi criada com sucesso.`,
      requestId: newRequest.id,
    });

    return { success: true, protocolo: newRequest.protocolo, request: newRequest };
  }

  getAllRequests() {
    return this.read(KEYS.requests).map(normalizeRequest);
  }

  getRequestById(id) {
    return this.getAllRequests().find((request) => request.id == id) ?? null;
  }

  updateRequest(id, updates) {
    const requests = this.read(KEYS.requests);
    const index = requests.findIndex((request) => request.id == id);

    if (index === -1) return false;

    const previousStatus = requests[index].status;
    const nextRequest = normalizeRequest({
      ...requests[index],
      ...updates,
      descricao: updates.descricao ?? updates.description ?? requests[index].descricao ?? requests[index].description,
    });

    requests[index] = nextRequest;
    this.write(KEYS.requests, requests);

    if (updates.status && updates.status !== previousStatus) {
      this.saveNotification({
        userId: nextRequest.userId,
        type: 'status_change',
        title: 'Status atualizado',
        message: `A solicitação "${nextRequest.titulo}" agora está como ${nextRequest.status}.`,
        requestId: nextRequest.id,
      });

      this.logActivity(
        'Status',
        `Solicitação ${nextRequest.protocolo} alterada para ${nextRequest.status}`,
        nextRequest.userId,
        nextRequest.id
      );
    }

    return true;
  }

  deleteRequest(id) {
    const requests = this.read(KEYS.requests).filter((request) => request.id != id);
    const responses = this.read(KEYS.responses).filter((response) => response.requestId != id);
    const notifications = this.read(KEYS.notifications).filter((notification) => notification.requestId != id);

    this.write(KEYS.requests, requests);
    this.write(KEYS.responses, responses);
    this.write(KEYS.notifications, notifications);
    this.logActivity('Exclusão', `Solicitação #${id} excluída`, null, id);
    return true;
  }

  saveResponse(response) {
    const responses = this.read(KEYS.responses);
    const requests = this.read(KEYS.requests);
    const request = requests.find((item) => item.id == response.requestId);

    const newResponse = {
      id: Date.now(),
      requestId: response.requestId,
      content: response.content,
      userId: response.userId,
      userName: response.userName,
      createdAt: new Date().toISOString(),
    };

    responses.push(newResponse);
    this.write(KEYS.responses, responses);

    if (request && request.userId !== response.userId) {
      this.saveNotification({
        userId: request.userId,
        type: 'new_response',
        title: 'Nova resposta',
        message: `Sua solicitação "${request.titulo}" recebeu uma nova resposta.`,
        requestId: request.id,
      });
    }

    this.logActivity(
      'Resposta',
      `Resposta enviada para a solicitação #${response.requestId}`,
      response.userId,
      response.requestId
    );

    return newResponse;
  }

  getResponsesByRequestId(requestId) {
    return this.read(KEYS.responses).filter((response) => response.requestId == requestId);
  }

  saveNotification(notification) {
    const notifications = this.read(KEYS.notifications);
    const newNotification = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      read: false,
      timestamp: new Date().toISOString(),
      ...notification,
    };

    notifications.unshift(newNotification);
    this.write(KEYS.notifications, notifications);
    return newNotification;
  }

  getNotifications(userId) {
    return this.read(KEYS.notifications).filter((notification) => notification.userId == userId);
  }

  markNotificationAsRead(notificationId) {
    const notifications = this.read(KEYS.notifications);
    const index = notifications.findIndex((notification) => notification.id == notificationId);
    if (index === -1) return false;
    notifications[index].read = true;
    this.write(KEYS.notifications, notifications);
    return true;
  }

  markAllNotificationsAsRead(userId) {
    const notifications = this.read(KEYS.notifications).map((notification) =>
      notification.userId == userId ? { ...notification, read: true } : notification
    );
    this.write(KEYS.notifications, notifications);
    return true;
  }

  getActivitiesByUser(userId) {
    return this.read(KEYS.activities).filter((activity) => activity.userId == userId || activity.userId == null);
  }

  logActivity(type, description, userId = null, requestId = null) {
    const activities = this.read(KEYS.activities);
    activities.unshift({
      id: Date.now() + Math.floor(Math.random() * 1000),
      type,
      description,
      userId,
      requestId,
      timestamp: new Date().toISOString(),
    });
    this.write(KEYS.activities, activities.slice(0, 200));
  }

  getUniqueCategories() {
    const requestCategories = this.getAllRequests().map((request) => request.categoria).filter(Boolean);
    return Array.from(new Set([...REQUEST_CATEGORIES, ...requestCategories])).sort();
  }
}

export const storageService = new HelpDeskStorage();
export { KEYS };
