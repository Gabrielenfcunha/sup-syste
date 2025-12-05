
import VermifugoForm from "@/components/vermifugo-form";
import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";
import css from "../../styles/signup.module.scss";

export default function BlogPostPage(props) {
  const router = useRouter();

  const vermifugoId = router.query.vermifugoId;
  const [values, setValues] = React.useState(null);

  async function fetchVermufugo() {
    const { data, error } = await postJson("/api/vermifugo/find", {id: vermifugoId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }

  React.useEffect((_) => {
    if (vermifugoId) fetchVermufugo();
  }, [vermifugoId]);

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
          '/api/vermifugo/upsert',
          {
            ...values,
            id: vermifugoId
          }
        );
        
        if (error) {
          // mostrar erro
          alert(error);
          return;
        }
  
        alert('deu certo' + data);
        router.push('/ListVermifugo');
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div className={css["signup-container"]}>
      <div>
        <VermifugoForm
          loading={!(vermifugoId && values)}
          values={values}
          onChange={onChange}
        />

        <button
          className={css["btn-submit"]}
          type="submit"
          onClick={handleSubmit}
          disabled={!(vermifugoId && values)}
          
        >
          Enviar
        </button>
      </div>
    </div>
  );
}