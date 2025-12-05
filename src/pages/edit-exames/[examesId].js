
import ExamesForm from "@/components/exames-form";
import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";
import css from "../../styles/signup.module.scss"

export default function BlogPostPage(props) {
  const router = useRouter();

  const examesId = router.query.examesId;
  const [values, setValues] = React.useState(null);

  async function fetchExames() {
    const { data, error } = await postJson("/api/exames/find", {id: examesId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }

  React.useEffect((_) => {
    if (examesId) fetchExames();
  }, [examesId]);

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
          '/api/exames/upsert',
          {
            ...values,
            id: examesId
          }
        );
        
        if (error) {
          // mostrar erro
          alert(error);
          return;
        }
  
        alert('deu certo' + data);
        router.push('/ListExames');
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div className={css["signup-container"]}>
      <h2 className={css["title"]}></h2>
      <div>
        <ExamesForm
          loading={!(examesId && values)}
          values={values}
          onChange={onChange}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(examesId && values)}
          className={css["btn-submit"]}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}