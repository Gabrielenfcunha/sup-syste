import { supabaseClient as supabase } from "@/util/supabase";
import React, { useState } from 'react';
import Link from "next/link";

export default function SignUP  () {
  
  const [formData,setFormData]=useState({
    fullName:'',email:'',password:''
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData)=>
      {
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      }
    )
  };

  
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options:{
            data:{
              full_name:formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('verifique seu e-mail para obter o link de verificação')
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div>
      <h1>Criar conta</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='Name'
          name='fullName'
          onChange={handleChange}
        />
        <input
          placeholder='Email'
          name='email'
          onChange={handleChange} autoComplete='username'
         />
        <input 
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange} autoComplete='current-password'
        />

         <button type="submit">
          Enviar
        </button>
      </form>
      <div>
        <h2>Bem-vindo ao Sup</h2>
        <p>Acesse sua conta para gerenciar os cuidados</p>
        <button><Link href = '/auth/Login'>Login</Link></button>
      </div>
    </div>
  )
};

