import { postJson } from "@/util/http";
import React from "react";

import css from './styles.module.scss';
import { Loader } from "../loader";

export default function vacinaForm(props) {

  const { values, onChange, loading } = props;
  const [userPets, setUserPets] = React.useState([]);

  async function fetchPets() {
    const {data, error} = await postJson(
      '/api/pets/list',
      {}
    );

    if (error) {
      alert('erro')
    } else {
      setUserPets(data);
    }
  }

    React.useEffect(_ => {
      fetchPets();
    }, []);

  return <div className={css["vacina-form"]}>
    <div>
      Titulo do formulario
    </div>
    <Loader active={!userPets.length} />
    <select
      name="pet"
      className={css['pets-list']}
      value={values?.['pet']?.id}
      onChange={onChange}>
      <option></option>
      {
        userPets.map(pet => {
          return (
            <option
              value={pet.id}
            >
              {pet.name}
            </option>
          );
        })
      }
    </select>
        <input
          placeholder='Vacina'
          name='vacina'
          value={values?.['vacina']}
          onChange={onChange}
         />
         <input
          placeholder='marca'
          name='marca'
          value={values?.['marca']}
          onChange={onChange}
         />
       <input
          placeholder='veterinario'
          name='veterinario'
          value={values?.['veterinario']}
          onChange={onChange}
         />
        <input
         placeholder="dose"
          name='dose'
          value={values?.['dose']}
          onChange={onChange}
          
         />

         <input
          placeholder='fabricacao'
          name='fabricacao'
          value={values?.['fabricacao']}
          onChange={onChange}
          type="date"
         />

         <input
         placeholder="vencimento"
          name='vencimento'
          value={values?.['vencimento']}
          onChange={onChange}
          type='date'
         />

  </div>
}