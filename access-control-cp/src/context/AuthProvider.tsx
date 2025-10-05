import React, { useEffect, useMemo, useState } from "react";
import { AuthContext, type Usuario } from "./AuthContext";

type AuthState = {
  usuario: Usuario | null;
  isAuthenticated: boolean;
};

const STORAGE_KEYS = {
  local: "auth:user:local",
  session: "auth:user:session",
};

function getStoredUser(): Usuario | null {
  try {
    const localRaw = localStorage.getItem(STORAGE_KEYS.local);
    const sessionRaw = sessionStorage.getItem(STORAGE_KEYS.session);
    const raw = sessionRaw ?? localRaw;
    if (!raw) return null;
    return JSON.parse(raw) as Usuario;
  } catch {
    return null;
  }
}

function storeUser(user: Usuario, persist: "local" | "session") {
  const serialized = JSON.stringify(user);
  if (persist === "local") {
    localStorage.setItem(STORAGE_KEYS.local, serialized);
    sessionStorage.removeItem(STORAGE_KEYS.session);
  } else {
    sessionStorage.setItem(STORAGE_KEYS.session, serialized);
  }
}

function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEYS.local);
  sessionStorage.removeItem(STORAGE_KEYS.session);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const usuario = getStoredUser();
    return { usuario, isAuthenticated: Boolean(usuario) };
  });

  useEffect(() => {
    // noop
  }, []);

  const login = useMemo(() => {
    return async (
      credenciais: { nomeUsuario: string; email: string },
      persist: "local" | "session"
    ): Promise<boolean> => {
      try {
        const res = await fetch("http://localhost:3001/usuarios");
        if (!res.ok) throw new Error("Falha ao consultar usuários");
        const usuarios: Usuario[] = await res.json();
        const encontrado = usuarios.find(
          (u) => u.nomeUsuario === credenciais.nomeUsuario && u.email === credenciais.email
        );
        if (!encontrado) return false;
        storeUser(encontrado, persist);
        setState({ usuario: encontrado, isAuthenticated: true });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    };
  }, []);

  const logout = useMemo(() => {
    return () => {
      clearStoredUser();
      setState({ usuario: null, isAuthenticated: false });
    };
  }, []);

  const value = useMemo(() => ({
    usuario: state.usuario,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  }), [state, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


