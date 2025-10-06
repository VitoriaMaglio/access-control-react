import React from 'react';
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
type FormValues = {
  nome: string;
  nomeUsuario: string;
  email: string;
};
const Cadastro: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> =  async (data) => {
     try {
        const res = await fetch("http://localhost:3001/usuarios");
        const usuarios = await res.json();
        const usuarioExistente = usuarios.find(
        (u: FormValues) => u.nomeUsuario === data.nomeUsuario
      );
      const emailExistente = usuarios.find(
        (u: FormValues) => u.email === data.email
      );
      let hasError = false;
      if (usuarioExistente) {
        setError("nomeUsuario", { type: "manual", message: "Nome de usuário já existe" });
        hasError = true;
      }
      if (emailExistente) {
        setError("email", { type: "manual", message: "Email já cadastrado" });
        hasError = true;
      }
      if (hasError) return; 
      const nextId = usuarios.length
        ? Math.max(
            ...usuarios.map((u: { id?: number | string }) => {
              // Converte ids string (ex.: "00b7") para 0 para ignorar aleatórios
              const parsed = typeof u.id === "string" ? Number(u.id) : u.id;
              return Number.isFinite(parsed) ? (parsed as number) : 0;
            })
          ) + 1
        : 1;

      await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: nextId, ...data })
      });
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  };


  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Cadastro</h2>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
           Nome:
        </label>
        <input
           id="nome"
           type="text"
          {...register("nome", {
            required: "Por favor, insira seu nome completo",
             minLength: { value: 3, message: "Nome deve ter pelo menos 3 caracteres" },
            maxLength: { value: 50, message: "Nome muito longo" },
           })}
           className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
        />
         {errors.nome && (
           <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
         )}
      </div>
      <div>
        <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">
           Nome de Usuário:
         </label>
        <input
           id="nomeUsuario"
           type="text"
           {...register("nomeUsuario", {
            required: "Insira um nome de usuário",
             minLength: { value: 3, message: "Nome de usuário deve ter ao menos 3 caracteres" },
            maxLength: { value: 20, message: "Nome de usuário muito longo" },
          })}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
        />
         {errors.nomeUsuario && (
           <p className="text-red-500 text-sm mt-1">{errors.nomeUsuario.message}</p>
         )}
      </div>
         {errors.nomeUsuario && <p style={{ color: 'red' }}>{errors.nomeUsuario.message}</p>}

      <div>
         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
           id="email"
          type="email"
          {...register("email", {
            required: "Insira um email válido",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de email inválido" },
            maxLength: { value: 50, message: "Email muito longo" },
           })}
           className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                      focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
         />
         {errors.email && (
           <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
       </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};
export default Cadastro;

