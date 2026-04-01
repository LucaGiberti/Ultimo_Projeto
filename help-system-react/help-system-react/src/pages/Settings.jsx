import { Building2, Lock, Mail, Save, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../components/layout/MainHeader';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { storageService } from '../services/storageService';
import { DEPARTMENTS } from '../utils/constants';

export default function Settings() {
  const { user, updateSessionUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '', department: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (!user) return;
    setProfile({
      name: user.nome_completo,
      email: user.email,
      department: user.departamento,
    });
  }, [user]);

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    if (!profile.name || !profile.email || !profile.department) {
      window.alert('Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      window.alert('Formato de e-mail inválido');
      return;
    }

    const updated = storageService.updateUser(user.id, {
      nome_completo: profile.name,
      email: profile.email,
      departamento: profile.department,
    });

    if (!updated || updated.error) {
      window.alert(updated?.error || 'Não foi possível atualizar o perfil');
      return;
    }

    updateSessionUser(updated);
    window.alert('Perfil atualizado com sucesso!');
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      window.alert('Preencha todos os campos de senha');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      window.alert('As senhas não coincidem');
      return;
    }

    if (passwords.newPassword.length < 6) {
      window.alert('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    const success = storageService.changePassword(user.id, passwords.currentPassword, passwords.newPassword);
    if (!success) {
      window.alert('Senha atual incorreta');
      return;
    }

    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    window.alert('Senha alterada com sucesso!');
  };

  const handleDeleteAccount = () => {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) return;
    storageService.deleteUserAccount(user.id);
    logout();
    window.alert('Conta excluída com sucesso');
    navigate('/');
  };

  return (
    <div className="bg-gradient min-page">
      <MainHeader title="Configurações" subtitle="Gerencie suas informações e preferências" backTo="/profile" />

      <main className="content-container space-y-6">
        <Card className="p-8 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Informações do Perfil</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div className="form-group">
              <label>Nome Completo</label>
              <div className="input-wrapper"><User size={18} /><input type="text" value={profile.name} onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))} /></div>
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <div className="input-wrapper"><Mail size={18} /><input type="email" value={profile.email} onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))} /></div>
            </div>
            <div className="form-group">
              <label>Departamento</label>
              <div className="input-wrapper"><Building2 size={18} />
                <select value={profile.department} onChange={(e) => setProfile((prev) => ({ ...prev, department: e.target.value }))}>
                  <option value="">Selecione um departamento</option>
                  {DEPARTMENTS.map((department) => <option key={department} value={department}>{department}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary inline-button centered-button"><Save size={18} /> Salvar Alterações</button>
          </form>
        </Card>

        <Card className="p-8 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Alterar Senha</h2>
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div className="form-group"><label>Senha Atual</label><div className="input-wrapper"><Lock size={18} /><input type="password" value={passwords.currentPassword} onChange={(e) => setPasswords((prev) => ({ ...prev, currentPassword: e.target.value }))} /></div></div>
            <div className="form-group"><label>Nova Senha</label><div className="input-wrapper"><Lock size={18} /><input type="password" value={passwords.newPassword} onChange={(e) => setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))} /></div></div>
            <div className="form-group"><label>Confirmar Nova Senha</label><div className="input-wrapper"><Lock size={18} /><input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords((prev) => ({ ...prev, confirmPassword: e.target.value }))} /></div></div>
            <button type="submit" className="btn-primary inline-button centered-button"><Lock size={18} /> Alterar Senha</button>
          </form>
        </Card>

        <Card className="p-8 border-red-200 shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-6">Zona de Perigo</h2>
          <p className="text-muted mb-4">Ao excluir sua conta, todas as suas solicitações e dados serão permanentemente removidos. Esta ação não pode ser desfeita.</p>
          <button type="button" onClick={handleDeleteAccount} className="btn-danger">Excluir Conta</button>
        </Card>
      </main>
    </div>
  );
}
