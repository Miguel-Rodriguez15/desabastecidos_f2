import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
interface AuthContextType {
  auth: { token: string | null; isAuthenticated: boolean };
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: { token: null, isAuthenticated: false },
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<{
    token: string | null;
    isAuthenticated: boolean;
  }>({ token: null, isAuthenticated: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token, isAuthenticated: true });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setAuth({ token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
