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
            {...register('nome', {
                required: 'Por favor, insira seu nome completo',
                minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' },
                maxLength: { value: 50, message: 'Nome muito longo' }
            })}
          />
          {errors.nome && <p style={{ color: 'red' }}>{errors.nome.message}</p>}
        </div>

        {/* Nome de usuário */}
        <div style={{ marginBottom: '10px' }}>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            {...register('nomeUsuario', {
                required: 'Insira um nome de usuário',
                minLength: { value: 3, message: 'Nome de usuário deve ter ao menos 3 caracteres' },
                maxLength: { value: 20, message: 'Nome de usuário muito longo' }
            })}

          />
          {errors.nomeUsuario && <p style={{ color: 'red' }}>{errors.nomeUsuario.message}</p>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { 
                required: 'Insira um email válido',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Formato de email inválido' },
                maxLength: { value: 50, message: 'Email muito longo' }
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

