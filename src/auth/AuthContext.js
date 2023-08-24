import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true' || false,
  );
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (authenticated) {
      localStorage.setItem('authenticated', 'true');
    } else {
      localStorage.removeItem('authenticated');
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider value={{
      authenticated, setAuthenticated, user, setUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
