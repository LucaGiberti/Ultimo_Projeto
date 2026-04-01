import { Calendar, FileText, History, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../ui/EmptyState';
import { formatLongDate, formatTime } from '../../utils/formatDate';

function ActivityIcon({ type }) {
  if (type === 'request_created') return <FileText size={18} className="text-blue" />;
  if (type === 'response_given') return <MessageSquare size={18} className="text-green" />;
  if (type === 'status_changed') return <Calendar size={18} className="text-purple" />;
  return <History size={18} className="text-muted" />;
}

export default function ActivityTimeline({ activities }) {
  const navigate = useNavigate();

  if (!activities.length) {
    return <EmptyState icon={History} title="Nenhuma atividade encontrada" />;
  }

  const grouped = activities.reduce((accumulator, activity) => {
    const key = formatLongDate(activity.timestamp);
    if (!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(activity);
    return accumulator;
  }, {});

  return (
    <div className="timeline-container">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="date-group">
          <div className="date-header">
            <h3>{date}</h3>
            <div className="line" />
          </div>
          {items.map((activity) => (
            <div
              key={activity.id}
              className="activity-card"
              onClick={() => activity.requestId && navigate(`/requests/${activity.requestId}`)}
            >
              <div className="activity-icon-wrapper">
                <ActivityIcon type={activity.type} />
              </div>
              <div className="activity-info">
                <p className="act-title">{activity.title}</p>
                <p className="act-desc">{activity.description}</p>
                <span className="act-time">{formatTime(activity.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
