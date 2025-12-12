
import { useRouter } from 'next/navigation';
import React, { useState  } from 'react';
import { supabaseClient as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss"


export default function  Listconsulta() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchconsulta() {
    const {data, error} = await postJson(
      '/api/consulta/list',
      {}
    );

    if (error) {
      alert('erro');
    } else {
      // remove registros sem pet para evitar erros
      setValues(data.filter(v => v.pet));
    }
  }

    
  React.useEffect(_ => {
    fetchconsulta();
  }, []);

  return (
    <div className={css["list-vacina"]}>
     <Loader active={!values.length} />  
     <h2>consulta</h2>    
     <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>Clinica</th>
            <th>data consulta</th>
            <th>horaio</th>
            <th>veterinario</th>
            <th>local</th>
            <th>motivi da consulta</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {values.length > 0 ? (
            values.map((value) => (
              <tr key={value.id}>
                <td>{value.pet?.name || "—"}</td>
                <th>{value.consulta}</th>
                <th>{value.data_consulta}</th>
                <th>{value.horaio}</th>
                <th>{value.veterinario}</th>
                <th>{value.local}</th>
                <th>{value.detalhes}</th>
              <th>
                <button className={css["btn-edit"]}
                  onClick={_ => {
                    router.push(`/edit-consulta/${value.id}`);
                  }}
                >Edit</button>
              </th>
                <th>
                <button className={css["btn-delete"]}
                  onClick={async _ => {
                    if (!window.confirm('tem certeza?')) {return;}
                    const {data, error} = await postJson(
                        '/api/consulta/delete',
                        {id:value.id}
                      );             
                      
                      if (error) {
                        //
                      } else {
                        fetchconsulta();
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
      <Link href='/SignUpConsulta'className={css["btn-back"]} >+</Link>
      <Link href ='/Homepage' className={css["btn-back"]}>Voltar</Link>

    </div>
  )
};