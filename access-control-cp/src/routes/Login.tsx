import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Página de Login</h1>

      <form>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nomeUsuario">Nome de usuário:</label>
          <br />
          <input id="nomeUsuario" type="text" placeholder="Digite seu nome de usuário" />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <br />
          <input id="email" type="email" placeholder="Digite seu email" />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  );
};


export default Login;
