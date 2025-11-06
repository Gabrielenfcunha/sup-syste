import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';

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
    <div>
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
              <th>{value.name}</th>
              <th>{value.especie}</th>
              <th>{value.raca}</th>
              <th>{value.castrdo}</th>
              <th>{value.data}</th>
              <th>
                <button
                  onClick={_ => {
                    router.push(`/edit-pet/${value.id}`);
                  }}
                >Edit</button>
              </th>
                            <th>
                <button
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
    </div>
  )
};



