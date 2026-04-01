import { storageService } from './storageService';

export const notificationService = {
  getNotifications(userId) {
    return storageService.getNotifications(userId);
  },
  markNotificationAsRead(notificationId) {
    return storageService.markNotificationAsRead(notificationId);
  },
  markAllNotificationsAsRead(userId) {
    return storageService.markAllNotificationsAsRead(userId);
  },
};
