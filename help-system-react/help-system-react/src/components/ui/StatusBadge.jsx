import { STATUS_LABELS } from '../../utils/constants';

export default function StatusBadge({ status }) {
  const safeStatus = status ?? 'ABERTA';
  return <span className={`badge-status status-${safeStatus.toLowerCase()}`}>{STATUS_LABELS[safeStatus] ?? safeStatus}</span>;
}
