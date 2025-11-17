
import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss"


export default function  ListVermifugo() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchvermifugo() {
    const {data, error} = await postJson(
      '/api/vermifugo/list',
      {}
    );

    if (error) {
      alert('erro')
    } else {
      setValues(data);
    }
  }

    
  React.useEffect(_ => {
    fetchvermifugo();
  }, []);

  return (
    <div className={css["list-vacina"]}>
      <Loader active={!values.length} />
      <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>vermifugo</th>
            <th>tipo vermifugo</th>
            <th>veterinario</th>
            <th>data vermifugo</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value)=>
            <tr>
              <th>{value.pet_vermifugo?.name}</th>
              <th>{value.vermifugo}</th>
              <th>{value.tipo_vermifugo}</th>
              <th>{value.data_vermifugo}</th>

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
                        '/api/vermifugo/delete',
                        {id:value.id}
                      );             
                      
                      if (error) {
                        //
                      } else {
                        fetchvermifugo();
                      }
                  }}
                >Deletar</button>
              </th>
            </tr>         
          )}
           
        </tbody>
      </table>
      <Link href ='/Homepage' className={css["btn-back"]}>Voltar</Link>

    </div>
  )
};