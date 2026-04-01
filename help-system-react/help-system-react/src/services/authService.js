import { storageService } from './storageService';

const SESSION_KEY = 'active_user';

export const authService = {
  login(email, senha) {
    const user = storageService
      .getUsers()
      .find((item) => item.email.toLowerCase() === email.toLowerCase() && item.senha === senha);

    if (!user) return { success: false };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  register(payload) {
    const result = storageService.saveUser(payload);
    if (result.success) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(result.user));
    }
    return result;
  },

  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  isAuthenticated() {
    return Boolean(this.getCurrentUser());
  },
};
