
import { postJson } from "@/util/http";
import React from "react";

import css from './styles.module.scss';
import { Loader } from "../loader";

export default function MedicaForm(props) {

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
     Medicamento
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
          placeholder='medicamento'
          name='medicamento'
          value={values?.['medicamento']}
          onChange={onChange}
         />
         <input
          placeholder='quantidade'
          name='quantidade'
          value={values?.['quantidade']}
          onChange={onChange}
         />
         <input
         placeholder="apresencao"
          name='apresencao'
          value={values?.['apresencao']}
          onChange={onChange}
         />
        <input
         placeholder="via_admi"
          name='via_admi'
          value={values?.['via_admi']}
          onChange={onChange}
         />
        <input
         placeholder="especial"
          name='especial'
          value={values?.['especial']}
          onChange={onChange}
         />
        <input
         placeholder="tipo_med"
          name='tipo_med'
          value={values?.['tipo_med']}
          onChange={onChange}
         />
      </div>
  </div>
}
