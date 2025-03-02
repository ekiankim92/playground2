import { BaseUser } from '@/api/me/types';
import { ACCESS_TOKEN, REFRESH_TOKEN, TokenResponse } from '@/api/user/types';
import { createContext, useContext, useState } from 'react';
import { deleteCookie, getCookie, setCookie } from '../util/cookies';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: BaseUser | null;
  setUser: React.Dispatch<React.SetStateAction<BaseUser | null>>;
  login: (tokens: TokenResponse) => void;
  logout: () => void;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getCookie(ACCESS_TOKEN));
  const [user, setUser] = useState<BaseUser | null>(null);

  const login = async (tokens: TokenResponse) => {
    setCookie(ACCESS_TOKEN, tokens.access_token, tokens.access_expires_in);
    setCookie(REFRESH_TOKEN, tokens.refresh_token, tokens.refresh_expires_in);
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REFRESH_TOKEN);
    setUser(null);
    setIsAuthenticated(false);
  };

  const getAccessToken = () => getCookie(ACCESS_TOKEN);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth를 사용하시려면 AuthProvider와 써주세요.');
  return context;
};
