export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="empty-state">
      {Icon ? <Icon className="big-icon" /> : null}
      <p>{title}</p>
      {description ? <p className="text-sm text-muted">{description}</p> : null}
    </div>
  );
}
