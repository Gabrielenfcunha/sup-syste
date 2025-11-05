import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';

export default function  SignUpPets () {

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Novo  Pet</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Name'
          name='name'
          value={values['name']}
          onChange={onChange}
         />

         <input
          placeholder='Name'
          name='especie'
          value={values['especie']}
          onChange={onChange}
         />

         <input
          placeholder='Name'
          name='raca'
          value={values['raca']}
          onChange={onChange}
         />

         <button type="submit">
          Enviar
        </button>
      </form>
     
        {/* <button><Link href='/auth/SignUP'>Inscreva - se</Link></button> */}
      </div>
  )
}