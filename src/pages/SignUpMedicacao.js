import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import MedicacaoForm from '@/components/medicacao-form';
import Link from "next/link";
import css from "../styles/signup.module.scss"


export default function  SignUpmedicacao() {

    const router = useRouter();

  const [values, setValues] = React.useState({});

  function onChange (event) {
    const { name, value } = event.target;

    setValues((oldValue) => {
      const newValue = {...oldValue, [name]: value};
      return newValue;
    });
  }



  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {

      const { data, error } = await postJson(
        '/api/medicacao/upsert',
        values
      );
      
      if (error) {
        // mostrar erro
        alert(error);
        return;
      }

      alert('deu certo' + data);
       router.push('/ListMedicacao');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={css["signup-container"]}>
      <h1 className={css["title"]}>Medicamento do pet</h1>
      <form onSubmit={handleSubmit} className={css["form"]}>
         <MedicacaoForm
           values={values}
           onChange={onChange}
         />
         <button type="submit" className={css["btn-submit"]}>
          Enviar
        </button>
      </form>
      <Link href ='/Homepage' className={css["btn-back"]}>Voltar</Link>
      </div>
  )
}