
import PetForm from "@/components/pet-form";
import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";

export default function BlogPostPage(props) {
  const router = useRouter();

  const petId = router.query.petId;
  const [values, setValues] = React.useState(null);

  async function fetchPet() {
    const { data, error } = await postJson("/api/pets/find", {id: petId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }

  React.useEffect((_) => {
    if (petId) fetchPet();
  }, [petId]);

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
          '/api/pets/insert',
          {
            ...values,
            id: petId
          }
        );
        
        if (error) {
          // mostrar erro
          alert(error);
          return;
        }
  
        alert('deu certo' + data);
        router.push('/ListPets');
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div>
      {
        petId && values && (
          <div>
             <PetForm
                values={values}
                onChange={onChange}
              />

              <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>
          </div>
        )
      }
      {
        !(petId && values) && (
          <div>
            carregando...
          </div>
        )
      }
    </div>
  );
}
