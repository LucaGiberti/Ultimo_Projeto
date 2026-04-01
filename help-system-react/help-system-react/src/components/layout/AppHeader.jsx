import { Bell, History, LogOut, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { notifications } = useNotifications(user?.id);
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <header className="dashboard-header">
      <div className="header-container max-w-7xl">
        <div className="brand">
          <h1>Help System</h1>
          <p>Sistema de Suporte Interno</p>
        </div>

        <div className="header-actions">
          <nav className="icon-nav">
            <Link to="/notifications" className="btn-icon" title="Notificações">
              <Bell size={20} />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </Link>
            <Link to="/history" className="btn-icon" title="Histórico">
              <History size={20} />
            </Link>
            <Link to="/profile" className="btn-icon" title="Perfil">
              <User size={20} />
            </Link>
            <Link to="/settings" className="btn-icon" title="Configurações">
              <Settings size={20} />
            </Link>
          </nav>

          <div className="user-profile">
            <div className="user-text">
              <p className="font-bold">{user?.nome_completo ?? 'Usuário'}</p>
              <p className="text-sm">{user?.departamento ?? 'Departamento'}</p>
            </div>
            <button
              type="button"
              className="btn-icon logout"
              title="Sair"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
