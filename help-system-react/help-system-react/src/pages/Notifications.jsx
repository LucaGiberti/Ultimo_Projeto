import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../components/layout/MainHeader';
import NotificationList from '../components/notifications/NotificationList';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { notificationService } from '../services/notificationService';

export default function Notifications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notifications, refreshNotifications } = useNotifications(user?.id);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter((item) => !item.read).length;
  const filteredNotifications = useMemo(() => {
    const base = filter === 'unread' ? notifications.filter((item) => !item.read) : notifications;
    return [...base].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [filter, notifications]);

  const handleNotificationClick = (notification) => {
    notificationService.markNotificationAsRead(notification.id);
    refreshNotifications();
    navigate(`/requests/${notification.requestId}`);
  };

  const handleMarkAll = () => {
    notificationService.markAllNotificationsAsRead(user.id);
    refreshNotifications();
  };

  return (
    <div className="bg-gradient min-page">
      <MainHeader title="Notificações" subtitle={`${unreadCount} não lida(s)`} backTo="/dashboard" />

      <main className="content-container">
        <div className="filter-tabs">
          <button type="button" onClick={() => setFilter('all')} className={`tab-btn ${filter === 'all' ? 'active' : ''}`}>
            Todas ({notifications.length})
          </button>
          <button type="button" onClick={() => setFilter('unread')} className={`tab-btn ${filter === 'unread' ? 'active' : ''}`}>
            Não Lidas ({unreadCount})
          </button>
        </div>

        {unreadCount > 0 && (
          <div className="flex justify-end mb-4">
            <button type="button" className="btn-text" onClick={handleMarkAll}>Marcar todas como lidas</button>
          </div>
        )}

        <Card className="notifications-list">
          <NotificationList notifications={filteredNotifications} filter={filter} onClick={handleNotificationClick} />
        </Card>
      </main>
    </div>
  );
}
