import { createContext } from "react";

export type Usuario = {
  id?: number;
  nome: string;
  nomeUsuario: string;
  email: string;
};

type AuthState = {
  usuario: Usuario | null;
  isAuthenticated: boolean;
};

export type AuthContextValue = AuthState & {
  login: (credenciais: { nomeUsuario: string; email: string }, persist: "local" | "session") => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);


