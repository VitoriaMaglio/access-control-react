import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  nomeUsuario: string;
  email: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate(); // <-- necessário para navegar

  const onSubmit = (data: LoginFormData) => {
    console.log("Dados do login:", data);
    alert(`Bem-vindo, ${data.nomeUsuario}!`);
  };

  const irParaCadastro = () => {
    navigate("/cadastro"); // navegação correta
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Página de Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nomeUsuario">Nome de usuário:</label>
          <br />
          <input
            id="nomeUsuario"
            type="text"
            {...register("nomeUsuario", { required: "Nome obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
          />
          {errors.nomeUsuario && <p style={{ color: "red" }}>{errors.nomeUsuario.message}</p>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email obrigatório",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } 
            })}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <button type="submit">Entrar</button>
      </form>

    <button type="button" onClick={irParaCadastro}>Ir para Cadastro</button>


    </div>
  );
};

export default Login;
