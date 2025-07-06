// frontend/src/contexts/SessionContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar sessão ao carregar
  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      try {
        setSession(JSON.parse(storedSession));
      } catch (error) {
        console.error('Error parsing session:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const userSession = {
        token: data.token,
        user: data.user
      };

      localStorage.setItem('session', JSON.stringify(userSession));
      setSession(userSession);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('session');
    setSession(null);
    navigate('/login');
  };

  const value = {
    session,
    loading,
    login,
    logout
  };

  return (
    <SessionContext.Provider value={value}>
      {!loading && children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}