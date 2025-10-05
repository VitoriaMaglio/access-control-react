import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";

interface LoginFormData {
  nomeUsuario: string;
  email: string;
}
const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate(); 
  const { login } = useAuth();
  const [persistencia, setPersistencia] = useState<"local" | "session">("session");

  const onSubmit = async (data: LoginFormData) => {
    const ok = await login({ nomeUsuario: data.nomeUsuario, email: data.email }, persistencia);
    if (!ok) {
      alert("Usuário não encontrado ou credenciais inválidas.");
      return;
    }
    navigate("/cadastro");
  };
  const irParaCadastro = () => {
    navigate("/cadastro"); 
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Página de Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">
            Nome de usuário:
          </label>
          <input
            id="nomeUsuario"
            type="text"
            {...register("nomeUsuario", { 
              required: "Por favor, insira seu nome de usuário", 
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: { value: 20, message: "Máximo 20 caracteres" }
            })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-indigo-500 focus:outline-none 
                      transition duration-200"
          />
          {errors.nomeUsuario && (
            <p className="text-red-500 text-sm mt-1">{errors.nomeUsuario.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { 
              required: "Por favor, insira seu email",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato inválido" },
              maxLength: { value: 50, message: "Email muito longo" }
            })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                      focus:ring-2 focus:ring-indigo-500 focus:outline-none 
                      transition duration-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Persistência:
          </label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="persistencia"
                value="session"
                checked={persistencia === "session"}
                onChange={() => setPersistencia("session")}
                className="text-indigo-500 focus:ring-indigo-500"
              />
              Somente esta sessão
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="persistencia"
                value="local"
                checked={persistencia === "local"}
                onChange={() => setPersistencia("local")}
                className="text-indigo-500 focus:ring-indigo-500"
              />
              Lembrar-me neste dispositivo
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold
                     hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          Entrar
        </button>
      </form>

      <button
        type="button"
        onClick={irParaCadastro}
        className="w-full mt-6 bg-gray-100 text-gray-800 py-2 rounded-lg font-medium
                   hover:bg-gray-200 transition duration-200 shadow-sm"
      >
        Ir para Cadastro
      </button>
    </div>
  );
};

export default Login;
