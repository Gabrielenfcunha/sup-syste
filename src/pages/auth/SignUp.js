import { supabaseClient as supabase } from "@/util/supabase";
import React, { useState } from 'react';
import Link from "next/link";
import css from "./style/signUp.module.scss"

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
    <div className={css["loginContainer"]}>
      <div className={css["formSection"]}>
        <h1>Criar conta</h1>
        <form onSubmit={handleSubmit} className={css["form"]}>
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
      </div>
      <div className={css["sideSection"]}>
        <h2>Bem-vindo ao Sup</h2>
        <p>Acesse sua conta para gerenciar os cuidados</p>
        <Link href = '/auth/Login' className={css["signupBtn"]}>Login</Link>
      </div>
    </div>
  )
};

