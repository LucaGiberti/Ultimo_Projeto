import { useCallback, useEffect, useState } from 'react';
import { notificationService } from '../services/notificationService';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  const refreshNotifications = useCallback(() => {
    if (!userId) {
      setNotifications([]);
      return;
    }
    setNotifications(notificationService.getNotifications(userId));
  }, [userId]);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  return { notifications, refreshNotifications };
}
