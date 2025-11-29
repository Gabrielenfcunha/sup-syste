
import VacinaForm from "@/components/vacina-form";
import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";
import css from "../../styles/signup.module.scss"

export default function BlogPostPage(props) {
  const router = useRouter();

  const vacinaId = router.query.vacinaId;
  const [values, setValues] = React.useState(null);

  async function fetchVacina() {
    const { data, error } = await postJson("/api/vacina/find", {id: vacinaId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }

  React.useEffect((_) => {
    if (vacinaId) fetchVacina();
  }, [vacinaId]);

  function onChange (event) {
    const { name, value } = event.target;

    setValues((oldValue) => {
      const newValue = {...oldValue, [name]: value};
      return newValue;
    });
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      
      try {
  
        const { data, error } = await postJson(
          '/api/vacina/upsert',
          {
            ...values,
            id: vacinaId
          }
        );
        
        if (error) {
          // mostrar erro
          alert(error);
          return;
        }
  
        alert('deu certo' + data);
        router.push('/ListVacina');
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div>
      <div>
        <VacinaForm
          loading={!(vacinaId && values)}
          values={values}
          onChange={onChange}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(vacinaId && values)}
          className={css["btn-submit"]}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}