import { AlertCircle, Bell, CheckCircle2, Clock3, MessageSquare } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';

function NotificationIcon({ type }) {
  if (type === 'new_response') return <MessageSquare size={18} className="text-blue" />;
  if (type === 'status_change') return <CheckCircle2 size={18} className="text-green" />;
  if (type === 'request_created') return <AlertCircle size={18} className="text-yellow" />;
  return <Bell size={18} className="text-muted" />;
}

export default function NotificationItem({ notification, onClick }) {
  return (
    <div className={`notification-item ${notification.read ? '' : 'unread'}`} onClick={() => onClick(notification)}>
      <div className="notification-icon-wrapper">
        <NotificationIcon type={notification.type} />
      </div>
      <div className="notification-content">
        <div className="notification-header">
          <p className="notification-title">{notification.title}</p>
          {!notification.read && <span className="unread-indicator" />}
        </div>
        <p className="notification-message">{notification.message}</p>
        <span className="notification-time"><Clock3 size={12} /> {formatDateTime(notification.timestamp)}</span>
      </div>
    </div>
  );
}
