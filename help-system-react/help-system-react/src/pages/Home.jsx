import { BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gradient min-page">
      <nav className="main-header public-nav">
        <div className="header-container max-w-7xl public-nav-inner">
          <div className="brand">
            <h1>Help System</h1>
          </div>
          <div className="flex gap-4 align-center">
            <Link to="/login" className="btn-text">Entrar</Link>
            <Link to="/register" className="btn-primary inline-button auto-width">Cadastre-se</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-12">
        <div className="hero-section">
          <h1>Suporte ágil para sua equipe</h1>
          <p className="text-muted hero-text">
            Centralize suas solicitações de TI, RH e Financeiro em um único lugar. Aumente a produtividade e resolva problemas com rapidez e transparência total.
          </p>
          <div className="flex center gap-4 wrap-mobile">
            <Link to="/register" className="btn-primary inline-button auto-width large-button">Começar Agora</Link>
            <Link to="/login" className="btn-outline inline-button auto-width large-button">Fazer Login</Link>
          </div>
        </div>

        <div className="feature-grid">
          <div className="card p-8 text-center">
            <div className="icon-circle alt-indigo"><Zap size={24} /></div>
            <h3>Rápido e Eficiente</h3>
            <p className="text-muted">Abra solicitações em segundos e acompanhe o progresso em tempo real.</p>
          </div>
          <div className="card p-8 text-center">
            <div className="icon-circle alt-green"><ShieldCheck size={24} /></div>
            <h3>Seguro e Confiável</h3>
            <p className="text-muted">Seus dados e solicitações estão protegidos com os melhores padrões de segurança.</p>
          </div>
          <div className="card p-8 text-center">
            <div className="icon-circle alt-yellow"><BarChart3 size={24} /></div>
            <h3>Gestão Completa</h3>
            <p className="text-muted">Acompanhe estatísticas, taxa de resolução e histórico completo de atividades.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
