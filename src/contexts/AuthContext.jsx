import React from 'react';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem('jwt') || null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (token) {
      localStorage.setItem('jwt', token);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [token]);

  const login = React.useCallback((jwtToken, user) => {
    setToken(jwtToken);
    setCurrentUser(user);
  }, []);

  const logout = React.useCallback(() => {
    setToken(null);
    setCurrentUser(null);
  }, []);

  const value = React.useMemo(
    () => ({
      currentUser,
      token,
      isLoading,
      login,
      logout,
      setCurrentUser,
      setIsLoading,
    }),
    [currentUser, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
