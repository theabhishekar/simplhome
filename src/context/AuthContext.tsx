import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // For demo purposes, we'll use a simple authentication system
  async function login(email: string, password: string) {
    // In a real app, you would validate credentials with a backend
    // For now, we'll simulate successful login
    setUser({
      id: '1',
      name: 'Demo User',
      email,
    });
  }

  async function signup(name: string, email: string, password: string) {
    // In a real app, you would register a new user with a backend
    // For now, we'll simulate successful registration
    setUser({
      id: '1',
      name,
      email,
    });
  }

  function logout() {
    setUser(null);
  }

  const isAuthenticated = user != null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}