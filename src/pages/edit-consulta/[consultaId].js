
import ConsultaForm from "@/components/consulta-form";
import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";
import css from "../../styles/signup.module.scss"

export default function BlogPostPage(props) {
  const router = useRouter();

  const consultaId = router.query.consultaId;
  const [values, setValues] = React.useState(null);

  async function fetchConsulta() {
    const { data, error } = await postJson("/api/consulta/find", {id: consultaId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }

  React.useEffect((_) => {
    if (consultaId) fetchConsulta();
  }, [consultaId]);

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
          '/api/consulta/upsert',
          {
            ...values,
            id: consultaId
          }
        );
        
        if (error) {
          // mostrar erro
          alert(error);
          return;
        }
  
        alert('deu certo' + data);
        router.push('/ListConsulta');
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div className={css["signup-container"]}>
      <h2 className={css["title"]}></h2>
      <div>
        <ConsultaForm
          loading={!(consultaId && values)}
          values={values}
          onChange={onChange}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(consultaId && values)}
           className={css["btn-submit"]}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}