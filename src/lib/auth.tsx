import { createContext, useContext, type ReactNode } from 'react';

interface AuthContextType {
  email: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const email = localStorage.getItem('userEmail') || null;

  return (
    <AuthContext.Provider value={{ email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthEmail = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthEmail must be used within AuthProvider');
  }
  return context.email;
};
