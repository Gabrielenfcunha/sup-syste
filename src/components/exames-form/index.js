
import { postJson } from "@/util/http";
import React from "react";

import css from './styles.module.scss';
import { Loader } from "../loader";

export default function ExamesForm(props) {

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
     Exames
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
          placeholder='exames'
          name='exames'
          value={values?.['exames']}
          onChange={onChange}
         />
        <input
         placeholder="detalhe"
          name='detalhe'
          value={values?.['detalhe']}
          onChange={onChange}
         />
        <input
         placeholder="data_exames"
          name='data_exames'
          value={values?.['data_exames']}
          onChange={onChange}
          type="date"
         />
      </div>
  </div>
}
