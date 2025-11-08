import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';

export default function  ListVacina () {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchvacina() {
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
    fetchvacina();
  }, []);

  return (
    <div>
      <Loader active={!values.length} />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Especie</th>
            <th>Raça</th>
            <th>Castrdo</th>
            <th>Data</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value)=>
            <tr>
              <th>{value.vacina}</th>
              <th>{value.marca}</th>
              <th>{value.veterinario}</th>
              <th>{value.dose}</th>
              <th>{value.fabricacao}</th>
              <th>{value.vencimento}</th>

              <th>
                <button
                  onClick={_ => {
                    router.push(`/edit-vacina/${value.id}`);
                  }}
                >Edit</button>
              </th>
                <th>
                <button
                  onClick={async _ => {
                    if (!window.confirm('tem certeza?')) {return;}
                    const {data, error} = await postJson(
                        '/api/vacina/delete',
                        {id:value.id}
                      );             
                      
                      if (error) {
                        //
                      } else {
                        fetchvacina();
                      }
                  }}
                >Deletar</button>
              </th>
            </tr>         
          )}
           
        </tbody>
      </table>
    </div>
  )
};



