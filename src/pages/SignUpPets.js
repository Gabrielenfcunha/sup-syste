import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import PetForm from '@/components/pet-form';
import Link from "next/link";
import css from "../styles/signup.module.scss"


export default function  SignUpPets () {

    const router = useRouter();
  
  // const [petsName,setPetsNome] = useState({
  //   name:'',password:''
  // });

  const [values, setValues] = React.useState({});

  function onChange (event) {
    const { name, value } = event.target;

    setValues((oldValue) => {
      const newValue = {...oldValue, [name]: value};
      return newValue;
    });
  }

  // function handleChange(event) {
  //   setPetsNome((prevFormData)=>
  //     {
  //       return{
  //         ...prevFormData,
  //         [event.target.name]:event.target.value
  //       }
  //     }
  //   )
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {

      const { data, error } = await postJson(
        '/api/pets/insert',
        values
      );
      
      if (error) {
        // mostrar erro
        alert(error);
        return;
      }

      alert('deu certo' + data);
      router.push('/ListPets');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={css["signup-container"]}>
      <h1 className={css["title"]}>Novo  Pet</h1>
      <form onSubmit={handleSubmit}  className={css["form"]}>
         <PetForm
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