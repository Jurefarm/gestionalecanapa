import { createContext, useContext, type ReactNode } from 'react';

interface AuthContextType {
  user: { email: string } | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const email = localStorage.getItem('userEmail') || null;
  const user = email ? { email } : null;

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthEmail = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthEmail must be used within AuthProvider');
  }
  return context.user?.email || null;
};
