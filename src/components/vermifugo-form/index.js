import { postJson } from "@/util/http";
import React from "react";

import css from './styles.module.scss';
import { Loader } from "../loader";

export default function VermifugoForm(props) {

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
      Titulo do formulario
    </h2>
    <Loader active={!userPets.length} />
    <div  className={css["form-group"]}>
    <select
      name="pet_vermifugo"
      className={css['pets-list']}
      value={values?.['pet_vermifugo']?.id}
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
          placeholder='vermifugo'
          name='vermifugo'
          value={values?.['vermifugo']}
          onChange={onChange}
         />
         <input
          placeholder='tipo_vermifugo'
          name='tipo_vermifugo'
          value={values?.['tipo_vermifugo']}
          onChange={onChange}
         />
         <input
         placeholder="data_vermifugo"
          name='data_vermifugo'
          value={values?.['data_vermifugo']}
          onChange={onChange}
          type='date'
         />
      </div>
  </div>
}