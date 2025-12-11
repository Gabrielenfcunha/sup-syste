import { useRouter } from 'next/navigation';
import { supabaseClient as supabase } from "@/util/supabase";
import React, { useState  } from 'react';
import Link from "next/link";
import css from "./style/login.module.scss"



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
   <div className={css["loginContainer"]}>
      <div className={css["formSection"]}>
        <h1>Entrar</h1>

        <form onSubmit={handleSubmit} className={css["form"]}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
            required
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          <button type="submit">
            Enviar
          </button>
        </form>
      </div>

      <div className={css["sideSection"]}>
        <h2>Olá, amigo</h2>
        <p><strong>
          Seu pet merece esse cuidado VIP! <br />
          Cadastre-se no SUP <br /> e deixe a saúde dele em boas patas!
          </strong>
        </p>
        <Link href="/auth/SignUp" className={css["signupBtn"]}>
          Inscreva-se
        </Link>
      </div>
    </div>
  )
};



