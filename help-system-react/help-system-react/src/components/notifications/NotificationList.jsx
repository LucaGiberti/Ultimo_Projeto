import { Bell } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import NotificationItem from './NotificationItem';

export default function NotificationList({ notifications, filter, onClick }) {
  if (!notifications.length) {
    return (
      <EmptyState
        icon={Bell}
        title="Nenhuma notificação encontrada"
        description={filter === 'unread' ? 'Todas as notificações foram lidas.' : 'Você receberá atualizações sobre suas solicitações aqui.'}
      />
    );
  }

  return (
    <div>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onClick={onClick} />
      ))}
    </div>
  );
}
