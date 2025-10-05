// src/routes/Cadastro.tsx
import React from 'react';
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type FormValues = {
  nome: string;
  nomeUsuario: string;
  email: string;
};

const Cadastro: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Dados do formulário:", data);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nome */}
        <div style={{ marginBottom: '10px' }}>
          <label>Nome:</label>
          <input
            type="text"
            {...register('nome', { required: 'Nome é obrigatório' })}
          />
          {errors.nome && <p style={{ color: 'red' }}>{errors.nome.message}</p>}
        </div>

        {/* Nome de usuário */}
        <div style={{ marginBottom: '10px' }}>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            {...register('nomeUsuario', { required: 'Nome de usuário é obrigatório' })}
          />
          {errors.nomeUsuario && <p style={{ color: 'red' }}>{errors.nomeUsuario.message}</p>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email é obrigatório',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Formato de email inválido'
              }
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;

