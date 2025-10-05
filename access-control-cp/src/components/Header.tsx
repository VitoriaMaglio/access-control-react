import React from "react";
import { useAuth } from "../context";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { usuario, isAuthenticated, logout } = useAuth();

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 16px",
      borderBottom: "1px solid #e5e7eb",
      marginBottom: 16
    }}>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
      </nav>
      <div>
        {isAuthenticated && usuario ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span><strong>{usuario.nome}</strong> ({usuario.email})</span>
            <button onClick={logout}>Sair</button>
          </div>
        ) : (
          <span style={{ color: "#6b7280" }}>Não autenticado</span>
        )}
      </div>
    </header>
  );
};

export default Header;


