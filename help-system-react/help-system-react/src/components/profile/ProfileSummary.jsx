import { Link } from 'react-router-dom';
import Card from '../ui/Card';

export default function ProfileSummary({ user }) {
  const initials = (user?.nome_completo ?? 'U').charAt(0).toUpperCase();

  return (
    <Card className="p-8 profile-avatar-card">
      <div className="avatar-circle">{initials}</div>
      <h2 className="text-2xl font-bold">{user?.nome_completo}</h2>
      <p className="text-muted mb-6">{user?.departamento}</p>

      <div className="info-list text-left">
        <div className="info-row"><label>E-mail:</label> <span>{user?.email}</span></div>
        <div className="info-row"><label>ID:</label> <span>{user?.id}</span></div>
      </div>

      <Link to="/settings" className="btn-primary mt-6 inline-button centered-button">
        Editar Perfil
      </Link>
    </Card>
  );
}
