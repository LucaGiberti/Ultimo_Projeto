import { Building2, Lock, Mail, User, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DEPARTMENTS } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', department: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const updateField = (field, value) => setForm((previous) => ({ ...previous, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.department || !form.password) {
      window.alert('Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      window.alert('Formato de e-mail inválido');
      return;
    }

    const result = register({
      nome_completo: form.name,
      email: form.email,
      senha: form.password,
      departamento: form.department,
    });

    if (!result.success) {
      window.alert(result.msg || 'Não foi possível criar a conta');
      return;
    }

    window.alert('Cadastro realizado com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-circle"><UserPlus size={24} /></div>
          <h1>Criar Conta</h1>
          <p>Cadastre-se no Help System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-group">
            <label>Nome Completo</label>
            <div className="input-wrapper">
              <User size={18} />
              <input type="text" placeholder="João Silva" value={form.name} onChange={(e) => updateField('name', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Departamento</label>
            <div className="input-wrapper">
              <Building2 size={18} />
              <select value={form.department} onChange={(e) => updateField('department', e.target.value)}>
                <option value="">Selecione um departamento</option>
                {DEPARTMENTS.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input type="password" placeholder="••••••••" value={form.password} onChange={(e) => updateField('password', e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn-primary">Criar Conta</button>
        </form>

        <div className="login-footer">
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
}
