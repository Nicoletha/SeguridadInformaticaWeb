import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const updateToken = (newToken: string | null) => {
    if (newToken) {
        localStorage.setItem("token", newToken);
    } else {
        localStorage.removeItem("token");
    }

    setToken(newToken);
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }

  return context;
};
