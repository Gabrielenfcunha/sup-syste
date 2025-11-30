
import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss"


export default function  ListMedicacao() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchmedicacao() {
    const {data, error} = await postJson(
      '/api/medicacao/list',
      {}
    );

    if (error) {
      alert('erro')
    } else {
      setValues(data);
    }
  }

    
  React.useEffect(_ => {
    fetchmedicacao();
  }, []);

  return (
    <div className={css["list-vacina"]}>
      <div>
        <h2> 
          Medicação
        </h2>
      </div>
      <Loader active={!values.length} />
      <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>medicacao</th>
            <th>Quantidade</th>
            <th>apresencao</th>
            <th>via_admi</th>
            <th>especial</th>
            <th>tipo_med</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {values.length > 0 ? (
    values.map((value) => (
       <tr>
              <th>{value.pet.name}</th>
              <th>{value.medicamento}</th>
              <th>{value.quantidade}</th>
              <th>{value.apresencao}</th>
              <th>{value.via_admi}</th>
              <th>{value.especial}</th>
              <th>{value.tipo_med}</th>
              <th>
                <button className={css["btn-edit"]}
                  onClick={_ => {
                    router.push(`/edit-medicacao/${value.id}`);
                  }}
                >Edit</button>
              </th>
                <th>
                <button className={css["btn-delete"]}
                  onClick={async _ => {
                    if (!window.confirm('tem certeza?')) {return;}
                    const {data, error} = await postJson(
                        '/api/medicacao/delete',
                        {id:value.id}
                      );             
                      
                      if (error) {
                        //
                      } else {
                        fetchmedicacao();
                      }
                  }}
                >Deletar</button>
              </th>
            </tr>     

            ))
          ) : (
           <tr>   
              <th className={css['empty']}>Nenhuma consulta cadastrado ainda 🐶</th>
            </tr> 
          )}           
        </tbody>
      </table>
      <Link href ='/Homepage' className={css["btn-back"]}>Voltar</Link>
      <Link href='/SignUpMedicacao' className={css["btn-back"]}>+</Link>

    </div>
  )
};