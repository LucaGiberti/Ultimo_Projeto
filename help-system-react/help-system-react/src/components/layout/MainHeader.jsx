import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MainHeader({ title, subtitle, backTo }) {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="header-container">
        <button type="button" onClick={() => navigate(backTo)} className="btn-icon">
          <ArrowLeft size={20} />
        </button>
        <div className="header-title">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
