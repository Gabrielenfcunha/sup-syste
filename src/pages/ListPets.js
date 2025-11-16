import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listPet.module.scss";

export default function  ListPets () {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchPets() {
    const {data, error} = await postJson(
      '/api/pets/list',
      {}
    );

    if (error) {
      alert('erro')
    } else {
      setValues(data);
    }
  }

    
  React.useEffect(_ => {
    fetchPets();
  }, []);

  return (
    <div className={css["list-vacina"]}>
      <Loader active={!values.length} />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Especie</th>
            <th>Raça</th>
            <th>Castrdo</th>
            <th>Data Nascimento</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value)=>
            <tr>
              <th>{value.name}</th>
              <th>{value.especie}</th>
              <th>{value.raca}</th>
              <th>{value.castrdo}</th>
              <th>{value.data}</th>
              <th>
                <button className={css["btn-edit"]}
                  onClick={_ => {
                    router.push(`/edit-pet/${value.id}`);
                  }}
                >Edit</button>
              </th>
              <th>
                <button className={css["btn-delete"]}
                  onClick={async _ => {
                    if (!window.confirm('tem certeza?')) {return;}
                    const {data, error} = await postJson(
                        '/api/pets/delete',
                        {id:value.id}
                      );             
                      
                      if (error) {
                        //
                      } else {
                        fetchPets();
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