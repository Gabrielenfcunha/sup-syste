
import { postJson } from "@/util/http";
import React from "react";

import css from './styles.module.scss';
import { Loader } from "../loader";

export default function ConsultaForm(props) {

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
    <h2 className={css["title"]}>
     Consulta
    </h2>
    <Loader active={!userPets.length} />
    <div  className={css["form-group"]}>
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
          placeholder='consulta'
          name='consulta'
          value={values?.['consulta']}
          onChange={onChange}
         />
        <input
         placeholder='local'
          name='local'
          value={values?.['local']}
          onChange={onChange}
         />
        <input
         placeholder='detalhes'
          name='detalhes'
          value={values?.['detalhes']}
          onChange={onChange}
         />
        <input
         placeholder="veterinario"
          name='veterinario'
          value={values?.['veterinario']}
          onChange={onChange}
         />
        <input
         placeholder="horaio"
          name='horaio'
          value={values?.['horaio']}
          onChange={onChange}
         />
        <input
         placeholder="data_consulta"
          name='data_consulta'
          value={values?.['data_consulta']}
          onChange={onChange}
          type="date"
         />
      </div>
  </div>
}
