import { useRouter } from 'next/navigation';
import { supabaseClient as supabase } from "@/util/supabase";
import React, { useState  } from 'react';
import Link from "next/link";



export default function  Login ({setToken}) {

  const router = useRouter();

  const [formData,setFormData] = useState({
    email:'',password:''
  });

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
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
      if (error) throw error
        console.log(data)
        router.push('/Homepage');
        setToken(data)

    } catch (error) {
      alert(error)
    }
  };

  return (
    <div>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
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
        <h2>Olá, amigo</h2>
        <p>Seu pet merece esse cuidado VIP!

Cadastre-se no SUP e deixe a saúde dele em boas patas!</p>
        <button><Link href='/auth/SignUP'>Inscreva - se</Link></button>
      </div>
    </div>
  )
};



