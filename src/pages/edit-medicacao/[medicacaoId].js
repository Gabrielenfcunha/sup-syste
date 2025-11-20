
import MedicacaoForm from "@/components/medicacao-form";
import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";

export default function BlogPostPage(props) {
  const router = useRouter();

  const medicacaoId = router.query.medicacaoId;
  const [values, setValues] = React.useState(null);

  async function fetchVacina() {
    const { data, error } = await postJson("/api/medicacao/find", {id: medicacaoId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }

  React.useEffect((_) => {
    if (medicacaoId) fetchVacina();
  }, [medicacaoId]);

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
          '/api/medicacao/upsert',
          {
            ...values,
            id: medicacaoId
          }
        );
        
        if (error) {
          // mostrar erro
          alert(error);
          return;
        }
  
        alert('deu certo' + data);
        router.push('/ListMedicacao');
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div>
      <div>
        <MedicacaoForm
          loading={!(medicacaoId && values)}
          values={values}
          onChange={onChange}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(medicacaoId && values)}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}