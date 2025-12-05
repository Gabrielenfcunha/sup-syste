
import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss"


export default function  Listvacina() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchexame() {
    const {data, error} = await postJson(
      '/api/vacina/list',
      {}
    );

    if (error) {
      alert('erro')
    } else {
      setValues(data);
    }
  }

    
  React.useEffect(_ => {
    fetchexame();
  }, []);

  return (
    <div className={css["list-vacina"]}>
      <Loader active={!values.length} />
      <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>Vacina</th>
            <th>Marca</th>
            <th>veterinario</th>
            <th>dose</th>
            <th>fabricaçao</th>
            <th>vencimento</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {values.length > 0 ? (
            values.map((value) => (
            <tr>
              <th>{value.pet.name}</th>
              <th>{value.vacina}</th>
              <th>{value.marca}</th>
              <th>{value.veterinario}</th>
              <th>{value.fabricacao}</th>
              <th>{value.vencimento}</th>
              <th>{value.dose}</th>
              <th>
                <button className={css["btn-edit"]}
                  onClick={_ => {
                    router.push(`/edit-vacina/${value.id}`);
                  }}
                >Edit</button>
              </th>
                <th>
                <button className={css["btn-delete"]}
                  onClick={async _ => {
                    if (!window.confirm('tem certeza?')) {return;}
                    const {data, error} = await postJson(
                        '/api/vacina/delete',
                        {id:value.id}
                      );             
                      
                      if (error) {
                        //
                      } else {
                        fetchexame();
                      }
                  }}
                >Deletar</button>
              </th>
            </tr>         
            ))
          ) : (<tr>   
              <th className={css['empty']}>Nenhuma consulta cadastrado ainda 🐶</th>
               </tr> )
          }  
        </tbody>
      </table>

      <Link href ='/Homepage' className={css["btn-back"]}>Voltar</Link>
      <Link href='/SignUpVacina' className={css["btn-back"]}>+</Link>

    </div>
  )
};