import { Lock, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      window.alert('Preencha todos os campos');
      return;
    }

    const result = login(email, password);
    if (!result.success) {
      window.alert('E-mail ou senha inválidos');
      return;
    }

    const redirectTo = location.state?.from?.pathname ?? '/dashboard';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-circle"><LogIn size={24} /></div>
          <h1>Help System</h1>
          <p>Sistema de Suporte Interno</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input label="E-mail" icon={<Mail size={18} />} type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Senha" icon={<Lock size={18} />} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn-primary">Entrar</button>
        </form>

        <div className="login-footer">
          <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
        </div>
      </div>
    </div>
  );
}
