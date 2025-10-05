import React from "react";

const Cadastro: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>Cadastro de Usuário</h1>
      <form style={{ display: "flex", flexDirection: "column", width: "250px", gap: "10px" }}>
        <input type="text" placeholder="Nome completo" />
        <input type="text" placeholder="Nome de usuário" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
