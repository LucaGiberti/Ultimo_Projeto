import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (email, senha) => {
        const result = authService.login(email, senha);
        if (result.success) setUser(result.user);
        return result;
      },
      register: (payload) => {
        const result = authService.register(payload);
        if (result.success) setUser(result.user);
        return result;
      },
      logout: () => {
        authService.logout();
        setUser(null);
      },
      refreshUser: () => {
        setUser(authService.getCurrentUser());
      },
      updateSessionUser: (nextUser) => {
        authService.setCurrentUser(nextUser);
        setUser(nextUser);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
